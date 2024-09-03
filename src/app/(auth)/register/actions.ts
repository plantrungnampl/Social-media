"use server";

import { lucia } from "@/auth";
import { db } from "@/lib/db";
import { signUpSchema, signupValues } from "@/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const Login = async (
  credential: signupValues
): Promise<{ error?: string }> => {
  try {
    const { username, email, password } = signUpSchema.parse(credential);
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    const userId = generateIdFromEntropySize(10);
    const exittingUsername = await db.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    if (exittingUsername) {
      return {
        error: "username aldready exiting",
      };
    }
    const exitingEmail = await db.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });
    if (exitingEmail) {
      return {
        error: "email already exiting",
      };
    }
    await db.user.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        password: passwordHash,
      },
    });
    const session = await lucia.createSession(userId, {});
    const sessionCookies = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookies.name,
      sessionCookies.value,
      sessionCookies.attributes
    );
    return redirect("/login");
  } catch (error) {
    console.error(error);
    if (isRedirectError(error)) throw error;
    return {
      error: "some thing went wrong",
    };
  }
};
