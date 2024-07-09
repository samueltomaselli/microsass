"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { userTable } from "@/server/schema";
import { eq } from "drizzle-orm";

export async function login(formData: FormData) {
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Nome ou senha inválidos",
    };
  }
  const password = formData.get("password");
  if (typeof password !== "string" || password.length < 6 || password.length > 255) {
    return {
      error: "Nome ou senha inválidos",
    };
  }

  const existingUser = await db.query.userTable.findFirst({
    where: eq(userTable.user, username.toLowerCase()),
  });

  if (!existingUser) {
    return {
      error: "Nome ou senha inválidos",
    };
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    return {
      error: "Nome ou senha inválidos",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect("/");
}
