import { getLoggedInUser } from "@/lib/services/user";

export default async function Home() {
  const user = await getLoggedInUser();
  return (
    <div>
      TEACHER
      {user?.email}
    </div>
  );
}
