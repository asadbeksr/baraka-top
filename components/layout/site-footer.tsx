import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { footerLinks } from "@/config/site";
import { cn } from "@/lib/utils";

import { NewsletterForm } from "../forms/newsletter-form";
import { Icons } from "../shared/icons";
import { Badge } from "../ui/badge";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("HomePage");
  return (
    <footer className={cn("border-t", className)}>
      <div className="container grid max-w-6xl grid-cols-2 gap-6 py-14 md:grid-cols-5">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <span className="text-sm font-medium text-foreground">
              {t(section.title)}
            </span>
            <ul className="mt-4 list-inside space-y-3">
              {section.items?.map((link) => (
                <li key={link.title}>
                  <Link
                    target={link.target || "_self"}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {t(link.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div></div>
        <div className="col-span-full flex flex-col gap-4 sm:col-span-1 md:col-span-2">
          <h6 className="flex items-center gap-2">
          {t("download_app")} <Badge variant="secondary">{t("soon")}</Badge>
          </h6>
          <div className="flex gap-2">
        <Image
          width={150}
          height={150}
          src="/_static/icons/app-store.svg"
          alt="Play Market"
          className="opacity-50 cursor-not-allowed" // Disabled style
        />

        <Image
          width={150}
          height={150}
          src="/_static/icons/play-store.svg"
          alt="App Store"
          className="opacity-50 cursor-not-allowed" // Disabled style
        />
      </div>

        </div>
      </div>

      <div className="border-t py-6">
        <div className="container flex max-w-6xl flex-col-reverse items-center justify-between gap-4 md:flex-row">
          <span className="text-xs text-muted-foreground text-center">
            {t("all_rights_reserved")}
          </span>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Link className="underline-offset-4 hover:underline" href="/terms">
              Публичная оферта
            </Link>
            <Link
              className="underline-offset-4 hover:underline"
              href="/privacy"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
