"use server";
import Base from "@/components/student/base";
import { getLoggedInUser } from "@/lib/services/users";
interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout = async ({ children }: StudentLayoutProps) => {
  const user = await getLoggedInUser();
  if (!user) {
    return <div>Loading...</div>;
  }
  return <Base user={user}>{children}</Base>;
};

export default StudentLayout;
