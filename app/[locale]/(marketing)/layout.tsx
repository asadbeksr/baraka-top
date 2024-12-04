import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { NavMobile } from "@/components/layout/mobile-nav";
import { useTranslations } from "next-intl";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  const t = useTranslations("HomePage");

  const messages = {
    about: t("about"),
    faq: t("faq"),
    partners: t("partners"),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <NavMobile messages={messages} />
      <NavBar scroll={true} messages={messages} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
