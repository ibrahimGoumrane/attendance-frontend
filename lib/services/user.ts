import { cookies } from "next/headers";
import { sessionSchema, userSchema } from "../schemas/user";
import { serverFetch } from "../serverUtils"


export async function getUserFromSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("connect.sid");
  if (!sessionId) return null;

  const res = await serverFetch(`${process.env.API_URL}/session`);
  console.log(res);
  if (!res.ok) return null;
  const rawSession = await res.json();
  const { success, data : user } = sessionSchema.safeParse(rawSession);
  if (!success) {
    return null;
  }
  return user;
}

export async function getUserFromDb() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("connect.sid");
  console.log(sessionId);
  if (!sessionId) return null;

  const res = await serverFetch(`${process.env.API_URL}/profile`);
  console.log(res);
  if (!res.ok) return null;
  const rawUser = await res.json();
  const { success, data : user } = userSchema.safeParse(rawUser);
  console.log(success, user);
  if (!success) {
    return null;
  }
  return user;
}