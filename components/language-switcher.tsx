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
    // Store current scroll position
    const scrollPos = window.scrollY;
    
    startTransition(() => {
      // Get the path after the locale
      const currentPath = pathname.split('/').slice(2).join('/');
      router.replace(`/${nextLocale}${currentPath ? `/${currentPath}` : ''}`, {
        scroll: false // Prevent automatic scrolling
      });
      
      // Restore scroll position after a short delay
      setTimeout(() => {
        window.scrollTo(0, scrollPos);
      }, 0);
    });
  };

  const langList = [
    {
      value: 'uz',
      label: '🇺🇿 O\'zbekcha',
      trigger: '🇺🇿 O\'z'
    },
    {
      value: 'oz',
      label: '🇺🇿 Ўзбекча',
      trigger: '🇺🇿 Ўз'
    },
    {
      value: 'ru',
      label: '🇷🇺 Русский',
      trigger: '🇷🇺 Ру'
    },
  ];

  return (
    <Select
      defaultValue={localActive}
      onValueChange={onValueChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[90px] border-none bg-secondary">
        <SelectValue placeholder="Select language" >
          {langList.find((lang) => lang.value === localActive)?.trigger}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {langList.map((lang) => (
          <SelectItem key={lang.value} value={lang.value} className="flex items-center gap-2">
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}