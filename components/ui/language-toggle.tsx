import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export function LanguageToggle() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();

  const onValueChange = (nextLocale: string) => {
    startTransition(() => {
      // Get the path after the locale
      const currentPath = pathname.split('/').slice(2).join('/');
      router.replace(`/${nextLocale}${currentPath ? `/${currentPath}` : ''}`);
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => onValueChange("uz")}
        variant={localActive === "uz" ? "default" : "ghost"}
        size="sm"
        className="flex items-center gap-2"
        disabled={isPending}
      >
        <span>🇺🇿</span>
        <span>O&apos;zbek</span>
      </Button>

      <Button
        onClick={() => onValueChange("oz")}
        variant={localActive === "oz" ? "default" : "ghost"}
        size="sm"
        className="flex items-center gap-2"
        disabled={isPending}
      >
        <span>🇺🇿</span>
        <span>Ўзбек</span>
      </Button>

      <Button
        onClick={() => onValueChange("ru")}
        variant={localActive === "ru" ? "default" : "ghost"}
        size="sm"
        className="flex items-center gap-2"
        disabled={isPending}
      >
        <span>🇷🇺</span>
        <span>Русский</span>
      </Button>
    </div>
  );
}
