import { getLoggedInUser } from "@/lib/services/users";

export default async function Home() {
  const user = await getLoggedInUser();
  return (
    <div>
      STUDENT
      {user?.email}
    </div>
  );
}
