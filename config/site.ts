import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Metanchi",
  description:
    "Metanchi ",
  url: site_url,
  ogImage: `${site_url}/_static/og.png`,
  mailSupport: "support@metanchi.uz",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "company",
    items: [
      { title: "about", href: "#about" },
      // { title: "terms", href: "/terms" },
      // { title: "privacy", href: "/privacy" },
      { title: "contact", href: "https://t.me/uzkuka" },
    ],
  },
  {
    title: "socials",
    items: [
      { title: "telegram", href: "https://t.me/metanchi_uz" },
      { title: "instagram", href: "https://instagram.com/metanchi_uz" },
    ],
  },

];


// {
//   title: "Docs",
//   items: [
//     { title: "Introduction", href: "#" },
//     { title: "Installation", href: "#" },
//     { title: "Components", href: "#" },
//     { title: "Code Blocks", href: "#" },
//   ],
// },