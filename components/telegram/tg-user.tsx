"use client";

import { useEffect, useState } from "react";
import { TelegramUser } from "@/types";
import WebApp from "@twa-dev/sdk";

import { UserAvatar } from "../shared/user-avatar";

export default function TgUser() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUser(WebApp.initDataUnsafe.user as TelegramUser);
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Telegram User</h1>
      <p className="mt-2 text-lg">This is a page for Telegram users</p>

      <UserAvatar
        user={{
          name: user?.first_name || "Mehmon",
          image: user?.photo_url || 'https://www.asadbek.me/images/4.png',
        }}
        className="size-8 border"
      />
      <ul>
        <li>
          <strong>First Name:</strong> {user?.first_name}
        </li>
        <li>
          <strong>Last Name:</strong> {user?.last_name}
        </li>
        <li>
          <strong>Username:</strong> {user?.username}
        </li>
        <li>
          <strong>Language:</strong> {user?.language_code}
        </li>
      </ul>
    </div>
  );
}
