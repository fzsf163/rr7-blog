import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class CustomError extends Error {
  status: number;
  statusText: string;

  constructor(status: number, statusText: string) {
    super(statusText);
    this.status = status;
    this.statusText = statusText;
    this.name = "CustomError";
  }
}

export class ErrorHandler {
  static handleError(error: unknown): CustomError {
    if (error instanceof PrismaClientKnownRequestError) {
      return new CustomError(
        this.getPrismaErrorCode(error.code),
        this.getPrismaErrorMessage(error.code),
      );
    } else if (error instanceof Error) {
      return new CustomError(
        500,
        error.message || "An unknown error occurred.",
      );
    } else {
      return new CustomError(500, "An unknown error occurred.");
    }
  }

  private static getPrismaErrorCode(code: string): number {
    // Map Prisma error codes to HTTP status codes if needed
    switch (code) {
      case "P2002":
        return 409; // Conflict
      case "P2025":
        return 404; // Not Found
      default:
        return 500; // Internal Server Error
    }
  }

  private static getPrismaErrorMessage(code: string): string {
    switch (code) {
      case "P2000":
        return "The provided value for the column is too long for the column's type.";
      case "P2001":
        return "A unique constraint failed on the table.";
      case "P2002":
        return "A unique constraint failed on the fields specified in the `where` condition.";
      case "P2003":
        return "A foreign key constraint failed on the field or relation.";
      case "P2004":
        return "A related record could not be found.";
      case "P2005":
        return "The value stored in the database for the field is invalid.";
      case "P2006":
        return "The provided fields include relations that are not selected.";
      case "P2007":
        return "The provided value for the column contains invalid characters.";
      case "P2008":
        return "The provided value for the column is invalid.";
      case "P2009":
        return "The provided value for the column is invalid.";
      case "P2010":
        return "The provided value for the column is invalid.";
      case "P2011":
        return "Null constraint violation on the column.";
      case "P2012":
        return "The change you are trying to make would violate the required relation between the `User` and `Post` models.";
      case "P2013":
        return "Missing a required value for the column.";
      case "P2014":
        return "The provided value for the column is invalid.";
      case "P2015":
        return "The provided value for the column is invalid.";
      case "P2016":
        return "The provided value for the column is invalid.";
      case "P2017":
        return "The provided value for the column is invalid.";
      case "P2018":
        return "The provided value for the column is invalid.";
      case "P2019":
        return "The provided value for the column is invalid.";
      case "P2020":
        return "The provided value for the column is invalid.";
      case "P2021":
        return "The provided value for the column is invalid.";
      case "P2022":
        return "The provided value for the column is invalid.";
      case "P2023":
        return "The provided value for the column is invalid.";
      case "P2024":
        return "The provided value for the column is invalid.";
      case "P2025":
        return "An operation failed because it depends on one or more records that were required but not found.";
      case "P2026":
        return "The provided value for the column is invalid.";
      case "P2027":
        return "The provided value for the column is invalid.";
      case "P2028":
        return "The provided value for the column is invalid.";
      case "P2029":
        return "The provided value for the column is invalid.";
      case "P2030":
        return "The provided value for the column is invalid.";
      case "P2031":
        return "The provided value for the column is invalid.";
      case "P2032":
        return "The provided value for the column is invalid.";
      case "P2033":
        return "The provided value for the column is invalid.";
      default:
        return "An unknown Prisma error occurred.";
    }
  }
}
