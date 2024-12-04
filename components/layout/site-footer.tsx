import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { footerLinks } from "@/config/site";
import { NewsletterForm } from "../forms/newsletter-form";
import { Icons } from "../shared/icons";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("HomePage");
  return (
    <footer className={cn("border-t", className)}>
      <div className="container grid max-w-6xl grid-cols-2 gap-6 py-14 md:grid-cols-5">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <span className="text-sm font-medium text-foreground">
              {section.title}
            </span>
            <ul className="mt-4 list-inside space-y-3">
              {section.items?.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-full flex flex-col items-end sm:col-span-1 md:col-span-2">
          {/* <NewsletterForm /> */}
        </div>
      </div>

      <div className="border-t py-6">
        <div className="container flex max-w-6xl items-center justify-between gap-4 flex-col-reverse md:flex-row">
          <span className="text-xs text-muted-foreground">
            {t("all_rights_reserved")}
          </span>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Link className="underline-offset-4 hover:underline" href="/terms">
            Публичная оферта
            </Link>
            <Link className="underline-offset-4 hover:underline" href="/privacy">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
