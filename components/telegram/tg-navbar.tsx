"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, HouseIcon, UserRound } from "lucide-react";

export default function TgNavbar() {
  const pathname = usePathname()

  const navLinks = [
    {
      name: "Home",
      icon: HouseIcon,
      path: "/telegram",
    },
    {
      name: "Saved",
      icon: Bookmark,
      path: "/telegram/saved",
    },
    {
      name: "Profile",
      icon: UserRound,
      path: "/telegram/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 z-50 h-16 w-full border-t b-5 bg-background">
      <div className="mx-auto grid h-full max-w-lg grid-cols-3 ">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={`${link.path}`}
            className="group inline-flex flex-col items-center justify-center gap-1 px-5 font-medium hover:bg-gray-50 dark:hover:bg-card"
          >
            <link.icon 
            color={pathname === link.path ? "#facc14" : "#9CA3AF"} />
            <span
              className={`text-sm ${pathname === link.path ? "text-primary dark:text-primary" : "text-gray-500 dark:text-gray-400"}`}
            >
              {link.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
