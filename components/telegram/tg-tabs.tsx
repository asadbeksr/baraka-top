"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookmarkIcon, HouseIcon, UserRoundIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  icon?: ReactNode | any;
};

const navLinks: Tab[] = [
  { title: "Bosh sahifa", icon: HouseIcon, value: "/telegram" },
  { title: "Saqlanganlar", icon: BookmarkIcon, value: "/telegram/saved" },
  { title: "Profil", icon: UserRoundIcon, value: "/telegram/profile" },
];

export const Tabs = ({
  tabs = navLinks,
  containerClassName,
  activeTabClassName,
  tabClassName,
}: {
  tabs?: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
}) => {
  const pathname = usePathname();

  // Extract the path after the language prefix
  const pathWithoutLang = pathname.replace(/^\/(uz|ru|oz)/, '');

  // Determine the active tab or fallback to "Bosh sahifa"
  const activeTabValue =
    tabs.find((tab) => tab.value === pathWithoutLang)?.value || "/telegram";


  return (
    <div
      className={cn(
        "relative mx-auto grid h-full w-full max-w-lg grid-cols-3 overflow-auto sm:overflow-visible no-visible-scrollbar",
        containerClassName
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTabValue === tab.value;
        return (
          <Link
            href={tab.value}
            key={tab.title}
            className={cn(
              "relative flex flex-col items-center gap-y-2 px-4 py-2",
              tabClassName
            )}
          >
            {isActive && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 rounded-sm bg-primary/10 dark:bg-card",
                  activeTabClassName
                )}
              />
            )}
            {tab.icon && (
              <tab.icon
                className={cn("z-20", isActive && "fill-primary")}
                color={isActive ? "#facc14" : "#9CA3AF"}
              />
            )}
            <span
              className={cn(
                "text-sm z-20",
                isActive
                  ? "text-primary dark:text-primary font-bold"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              {tab.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
