import { getUserFromDb } from "@/lib/services/user";

export default async function Home() {
  const user = await getUserFromDb();
  console.log(user);
  return (
    <div>
      {user?.email}
    </div>
  );
}
