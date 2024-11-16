import Link from "next/link";
import { Globe, Map, SlidersHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TgStations from "@/components/telegram/tg-stations";

export default async function TgHome() {
  const filters = [
    { id: "all", label: "Hudud", icon: Globe },
    { id: "map", label: "Xaritada", icon: Map, href: "/telegram/map" }, // Added href for map
    { id: "station", label: "Filtr", icon: SlidersHorizontalIcon },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <ScrollArea className="no-scrollbar w-full border-b">
        <div className="flex gap-2 p-4">
          {filters.map((filter) => (
            filter.href ? (
              <Link key={filter.id} href={filter.href} passHref>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2"
                >
                  <filter.icon className="h-5 w-5" />
                  {filter.label}
                </Button>
              </Link>
            ) : (
              <Button
                key={filter.id}
                variant="ghost"
                className="flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2"
              >
                <filter.icon className="h-5 w-5" />
                {filter.label}
              </Button>
            )
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TgStations />
    </div>
  );
}
