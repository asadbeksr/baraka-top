"use client";

import TgNavbar from "@/components/telegram/tg-navbar";
import { usePathname } from "next/navigation";
import { telegramConfig } from "@/config/telegram";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function TgMainLayout({ children }: MarketingLayoutProps) {
  const pathname = usePathname();
  const hideNavbar = telegramConfig.shouldHideNavbar(pathname);

  return (
    <div className="flex min-h-screen flex-col pb-[80px]">
      {!hideNavbar && <TgNavbar />}
      <main className="w-full max-w-screen-sm mx-auto flex-1">{children}</main>
    </div>
  );
}
