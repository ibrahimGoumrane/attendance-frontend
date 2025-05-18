"use server";
import Base from "@/components/admin/base";
import { getLoggedInUser } from "@/lib/services/users";
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const user = await getLoggedInUser();
  if (!user) {
    return <div>Loading...</div>;
  }
  return <Base user={user}>{children}</Base>;
};

export default AdminLayout;
