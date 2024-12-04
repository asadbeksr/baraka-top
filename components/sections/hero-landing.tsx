import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { useTranslations } from "next-intl";

export default async function HeroLanding() {
  const t = useTranslations("HomePage");
  return (
    <section className="flex items-center justify-center min-h-[70vh]">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-gradient_indigo-purple font-extrabold">
            {t("title")} {/* Update this translation to match your content */}
          </span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          {t("description")} {/* Custom description text here */}
          {/* Example: "Start your journey with Metanchi from Jizzak — where tradition meets modern technology!" */}
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          {/* @metanchiuz_bot */}
          <Link
            href="https://t.me/metanchiuz_bot"
            target="_blank"
            prefetch={true}
            className={cn(
              buttonVariants({ size: "lg", }),
              "gap-2",
            )}
          >
            <span>{t("cta_text")}</span> {/* Example: "Start Your Journey" */}
            <Icons.arrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
