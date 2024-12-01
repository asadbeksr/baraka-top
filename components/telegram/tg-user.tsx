"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  BriefcaseBusinessIcon,
  HelpCircle,
  Info,
  Languages,
  Mail,
  Map,
  Navigation,
  Phone,
  Plus,
  SendIcon,
  Settings,
} from "lucide-react";

import { getTelegramUser, TelegramUser } from "@/lib/telegram";
import { openTgLink } from "@/lib/utils";
import { version } from "@/lib/version";

import { UserAvatar } from "../shared/user-avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { LanguageToggle } from "../ui/language-toggle";
import TgDebugInfo from "./tg-debug-info";

interface MenuItem {
  id: string;
  icon: ReactNode;
  title: string;
  type?: "link" | "drawer";
  href?: string;
  description?: string;
  content?: ReactNode;
}

export default function TgUser() {
  const [user, setUser] = useState<TelegramUser>(getTelegramUser());
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  const [language, setLanguage] = useState<"uz" | "ru">("uz");

  useEffect(() => {
    setUser(getTelegramUser());
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: "partnership",
      icon: <BriefcaseBusinessIcon className="size-5" />,
      title: "Hamkorlik",
      type: "link",
      href: "https://t.me/metanchi_partners",
    },
    {
      id: "settings",
      icon: <Settings className="size-5" />,
      title: "Sozlamalar",
      content: (
        <div className="flex flex-col gap-4">
          <div className="ml-2 flex items-center gap-2">
            <Languages className="size-5" />
            <span>Til / Язык</span>
          </div>
          <LanguageToggle value={language} onChange={setLanguage} />
        </div>
      ),
    },
    {
      id: "help",
      icon: <HelpCircle className="size-5" />,
      title: "Yordam",
      content: (
        <div className="flex flex-col gap-4">
          <Button
            variant="secondary"
            className="flex h-12 items-center justify-start gap-2"
            onClick={() => window.open("https://t.me/uzkuka", "_blank")}
          >
            <SendIcon className="size-5" />
            <span>Telegram</span>
          </Button>
          <Button
            variant="secondary"
            className="flex h-12 items-center justify-start gap-2"
            onClick={() => window.open("tel:+998971589333")}
          >
            <Phone className="size-5" />
            <span>+998 97 158 93 33</span>
          </Button>
          <Button
            variant="secondary"
            className="flex h-12 items-center justify-start gap-2"
            onClick={() => window.open("mailto:yordam@metanchi.uz")}
          >
            <Mail className="size-5" />
            <span>yordam@metanchi.uz</span>
          </Button>
        </div>
      ),
    },
    {
      id: "about",
      icon: <Info className="size-5" />,
      title: "Biz haqimizda",
      description: `v${version}`,
      content: (
        <div className="flex flex-col gap-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            Metanchi.uz — это ваш надежный помощник для заправки метановым газом
            в Узбекистане. Теперь вы всегда будете в курсе ситуации на любой
            АЗС. Узнавайте наличие газа, текущее давление и просматривайте
            онлайн камеры, чтобы понять, есть ли очередь.
          </div>
          <p className="text-xs">Версия: {version}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6 p-4">
      <Card className="flex items-center p-4">
        <UserAvatar
          user={{
            name: user.first_name,
            image: user.photo_url,
          }}
          className="size-20 border"
        />

        <CardContent className="pb-0">
          <h2 className="text-lg font-bold">{user.first_name}</h2>
          {user?.username && <p className="text-gray-500">@{user.username}</p>}
        </CardContent>
      </Card>

      <Card>
        <div className="flex flex-col divide-y">
          {menuItems.map((item) => (
            <div key={item.id} className="py-4">
              {item.type === "link" ? (
                <a
                  href={item.href!}
                  className="flex items-center gap-3 px-4 hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon}
                  <span className="flex-1">{item.title}</span>
                  {item?.description && (
                    <span className="text-xs text-muted-foreground">
                      {item?.description}
                    </span>
                  )}
                </a>
              ) : (
                <Drawer
                  open={openDrawer === item.id}
                  onOpenChange={(open) => setOpenDrawer(open ? item.id : null)}
                >
                  <DrawerTrigger asChild>
                    <button className="flex w-full items-center justify-between gap-3 px-4 hover:text-primary focus:outline-none">
                      <div className="items-cente flex gap-3">
                        {item.icon}
                        <span className="flex-1">{item.title}</span>
                      </div>
                      {item.description && (
                        <span className="text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="border-b pb-4">
                      <DrawerTitle className="text-start">
                        {item.title}
                      </DrawerTitle>
                    </DrawerHeader>
                    <div className="flex-1 overflow-y-auto px-4 py-6">
                      {item.content}
                    </div>
                  </DrawerContent>
                </Drawer>
              )}
            </div>
          ))}
        </div>
        {/* <TgDebugInfo /> */}
      </Card>
    </div>
  );
}
