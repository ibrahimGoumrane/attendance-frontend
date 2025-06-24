"use server";
import Base from "@/components/teacher/base";
import { getLoggedInUser } from "@/lib/services/users";
import { Toaster } from "@/components/ui/sonner";

interface TeacherLayoutProps {
  children: React.ReactNode;
}

const TeacherLayout = async ({ children }: TeacherLayoutProps) => {
  const user = await getLoggedInUser();
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <Base user={user}>
      {children}
      <Toaster />
    </Base>
  );
};

export default TeacherLayout;
