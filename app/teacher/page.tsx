import { getLoggedInUser } from "@/lib/services/user";

export default async function Home() {
  const user = await getLoggedInUser();
  console.log(user);
  return (
    <div>
      TEACHER
      {user?.email}
    </div>
  );
}
