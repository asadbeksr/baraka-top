import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getCurrentUser();

  if (user) {
    if (user.role === "ADMIN") redirect("/dashboard/stations");
    redirect("/dashboard/stations");
  }

  return <div className="min-h-screen">{children}</div>;
}