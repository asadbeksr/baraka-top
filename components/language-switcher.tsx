'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LanguageSwitcher() {
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
    <Select
      defaultValue={localActive}
      onValueChange={onValueChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="uz" className="flex items-center gap-2">
          <span>🇺🇿</span> O&apos;zbek
        </SelectItem>
        <SelectItem value="oz" className="flex items-center gap-2">
          <span>🇺🇿</span> Ўзбек
        </SelectItem>
        <SelectItem value="ru" className="flex items-center gap-2">
          <span>🇷🇺</span> Русский
        </SelectItem>
      </SelectContent>
    </Select>
  );
}