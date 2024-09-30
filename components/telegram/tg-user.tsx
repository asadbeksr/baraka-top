"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TelegramUser } from "@/types";
import WebApp from "@twa-dev/sdk";

import { UserAvatar } from "../shared/user-avatar";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { TgCard, TgCardContent } from "./tg-card";

const defaultUser: TelegramUser = {
  id: 1,
  is_bot: false,
  is_premium: false,
  first_name: "Mehmon",
  last_name: "Mehmon",
  username: "mehmon",
  language_code: "en",
  photo_url: "",
};

export default function TgUser() {
  const [user, setUser] = useState<TelegramUser | null>(defaultUser);
  const [object, setObject] = useState<any | null>(null);
  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUser(WebApp.initDataUnsafe.user as TelegramUser);
      setObject({
        bottomBarColor: WebApp.bottomBarColor,
        isExpanded: WebApp.isExpanded,
        viewportHeight: WebApp.viewportHeight,
        viewportStableHeight: WebApp.viewportStableHeight,
        themeParams: WebApp.themeParams,
        BiometricManager: WebApp.BiometricManager,
        colorScheme: WebApp.colorScheme,
        isVerticalSwipesEnabled: WebApp.isVerticalSwipesEnabled,
      });
    }
  }, []);
  return (
    <div className="flex w-full flex-col gap-2">
      <TgCard className="flex items-center">
        <UserAvatar
          user={{
            name: user?.first_name ?? null,
            image: user?.photo_url ?? null,
          }}
          className="size-24 border"
        />

        <TgCardContent className="pb-0">
          <h2 className="text-lg font-bold">{user?.first_name}</h2>
          <p className="text-gray-500">{user?.username}</p>
        </TgCardContent>
      </TgCard>

      <TgCard className="min-h-svh">
        <ul>
          {Object.keys(object).map((key) => {
            return (
              <li
                key={key}
                className="flex items-center justify-between border-b py-2"
              >
                <span>{key}</span>
                <span>{object[key]}</span>
              </li>
            );
          })}
        </ul>
      </TgCard>
    </div>
  );
}
