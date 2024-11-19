"use client";

import { useEffect, useState } from "react";
import { getTelegramUser, TelegramUser } from "@/lib/telegram";
import { UserAvatar } from "../shared/user-avatar";
import { TgCard, TgCardContent } from "./tg-card";
import TgDebugInfo from "./tg-debug-info";

export default function TgUser() {
  const [user, setUser] = useState<TelegramUser>(getTelegramUser());

  useEffect(() => {
    // Update user data when component mounts
    setUser(getTelegramUser());
  }, []);

  return (
    <div className="flex w-full flex-col gap-2">
      <TgCard className="flex items-center">
        <UserAvatar
          user={{
            name: user.first_name,
            image: user.photo_url,
          }}
          className="size-24 border"
        />

        <TgCardContent className="pb-0">
          <h2 className="text-lg font-bold">{user.first_name}</h2>
          <p className="text-gray-500">@{user.username}</p>
        </TgCardContent>
      </TgCard>

      <TgCard className="min-h-svh">
        <TgDebugInfo />
      </TgCard>
    </div>
  );
}
