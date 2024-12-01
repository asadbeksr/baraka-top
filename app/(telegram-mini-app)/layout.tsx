"use client";

import TgNavbar from "@/components/telegram/tg-navbar";
import { useEffect } from "react";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: any;
    };
  }
}

export default function TgMainLayout({ children }: MarketingLayoutProps) {
  useEffect(() => {
    const saveTelegramUser = async () => {
      try {
        const webAppUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
        if (!webAppUser) {
          console.log("No Telegram user data available");
          return;
        }

        const response = await fetch("/api/telegram/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: webAppUser.id,
            is_bot: webAppUser.is_bot,
            first_name: webAppUser.first_name,
            last_name: webAppUser.last_name,
            username: webAppUser.username,
            language_code: webAppUser.language_code,
            is_premium: webAppUser.is_premium,
            added_to_attachment_menu: webAppUser.added_to_attachment_menu,
            allows_write_to_pm: webAppUser.allows_write_to_pm,
            photo_url: webAppUser.photo_url
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save user data');
        }

        const data = await response.json();
        console.log('Successfully saved telegram user:', data);
      } catch (error) {
        console.error('Error saving telegram user:', error);
      }
    };

    // Call the function when the app loads
    saveTelegramUser();
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div className="flex min-h-screen flex-col pb-[80px]">
      <TgNavbar />
      <main className="w-full max-w-screen-sm mx-auto flex-1">{children}</main>
    </div>
  );
}
