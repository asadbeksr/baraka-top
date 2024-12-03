import { useTranslations } from "next-intl";

import TgUser from "@/components/telegram/tg-user";

export default function TgProfile() {
  const t = useTranslations("TgUser");

  const translations = {
    partnership: t("partnership"),
    settings: t("settings"),
    language: t("language"),
    help: t("help"),
    about: t("about"),
    version: t("version"),
    description: t("description")
  };

  return <TgUser translations={translations} />;
}