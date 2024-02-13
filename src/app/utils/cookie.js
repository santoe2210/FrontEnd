"use server";

import { cookies } from "next/headers";

export async function setToken(token) {
  const expires = new Date(Date.now() + 1000 * 1000);

  cookies().set("token", token, { expires, httpOnly: true, path: "/" });
}

export async function getToken() {
  const session = cookies().get("token")?.value;
  if (!session) return null;
  return session;
}

export async function deleteToken() {
  // Destroy the session
  cookies().set("token", "", { expires: new Date(0) });
}
