
import Dashboard from "../../../components/layouts/dashboard";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Dashboard>{children}</Dashboard>
    );
}