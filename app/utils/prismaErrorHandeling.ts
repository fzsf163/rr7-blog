import { Prisma } from "@prisma/client";
import { db } from "./db.server";
// Define custom error types
export type DatabaseError = {
  message: string;
  code: string;
  status: number;
};

// Main error handler function
export function handlePrismaError(error: unknown): DatabaseError {
  // Check if error is a Prisma error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle unique constraint violations
    if (error.code === "P2002") {
      const field = (error.meta?.target as string[]) || ["record"];
      return {
        message: `A ${field.join(", ")} with this value already exists.`,
        code: "UNIQUE_CONSTRAINT_VIOLATION",
        status: 409,
      };
    }

    // Handle foreign key constraint violations
    if (error.code === "P2003") {
      return {
        message: "Related record not found.",
        code: "FOREIGN_KEY_CONSTRAINT_VIOLATION",
        status: 400,
      };
    }

    // Handle record not found
    if (error.code === "P2025") {
      return {
        message: "Record not found.",
        code: "RECORD_NOT_FOUND",
        status: 404,
      };
    }

    // Handle invalid data type
    if (error.code === "P2006") {
      return {
        message: "Invalid data provided.",
        code: "INVALID_DATA",
        status: 400,
      };
    }
  }

  // Handle Prisma validation errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      message: "Invalid data format.",
      code: "VALIDATION_ERROR",
      status: 400,
    };
  }

  // Handle initialization errors
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      message: "Database connection failed.",
      code: "DATABASE_CONNECTION_ERROR",
      status: 503,
    };
  }

  // Default error
  return {
    message: "An unexpected database error occurred.",
    code: "INTERNAL_SERVER_ERROR",
    status: 500,
  };
}

// Utility function to create error responses
export function createErrorResponse(error: unknown) {
  const handledError = handlePrismaError(error);
  return Response.json(
    { error: handledError },
    { status: handledError.status },
  );
}

// Example usage in a Remix loader or action
export async function exampleLoader() {
  try {
    // Your Prisma query here
    const result = await db.user.findUnique({
      where: { id: "non-existent-id" },
    });

    return Response.json({ data: result });
  } catch (error) {
    return createErrorResponse(error);
  }
}

// Custom hook for handling Prisma errors in components
export function usePrismaError(error: unknown) {
  const handledError = handlePrismaError(error);

  return {
    message: handledError.message,
    code: handledError.code,
    status: handledError.status,
    isError: true,
  };
}
