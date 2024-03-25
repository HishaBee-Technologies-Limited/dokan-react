import { auth } from '@/auth';
import Dashboard from '@/components/layouts/dashboard';
import { SessionProvider } from 'next-auth/react';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider basePath="/" session={session}>
      <Dashboard session={session}>{children}</Dashboard>
    </SessionProvider>
  );
}
