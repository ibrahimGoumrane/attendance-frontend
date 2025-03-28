import { serverFetch } from "../serverUtils";

export async function getLoggedInUser() {
  const user = await serverFetch(`${process.env.API_URL}/user`);
  const userJson = await user.json();
  return userJson;
}