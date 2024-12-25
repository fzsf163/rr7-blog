import { db } from "./db.server";

export default async function FindOrCreateUser(
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
) {
  let user = null;
  const uc = await db.user.count();
  if (uc === 0) {
    user = await db.user.create({
      data: {
        email: email as string,
        password: password as string,
      },
    });
  } else {
    user = await db.user.findUnique({
      where: {
        email: email as string,
      },
      select: {
        password: true,
        email: true,
        id: true,
      },
    });
  }

  // return user ? { userID: user.id } : { userID: "Notfound" };
  return user
    ? { userID: user?.id, password: user?.password }
    : { userID: "Not Found", password: "Not Found" };
}
