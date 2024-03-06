import { auth } from "@/auth";
import Dashboard from "@/components/layouts/dashboard";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const cookie = cookies().getAll();
  console.log("ddddddd", cookie);
  console.log("ddddddd", session);
  return <Dashboard>{children}</Dashboard>;
}
