import Image from "next/image";
import {
  ClockIcon,
  Gauge,
  Globe,
  Heart,
  Map,
  ParkingCircle,
  Share2,
  ShoppingCart,
  SlidersHorizontalIcon,
  Star,
  WifiIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { getAllStations } from "@/lib/stations";
import TgStations from "@/components/telegram/tg-stations";

export default async function TgHome() {

  const filters = [
    { id: "all", label: "Hudud", icon: Globe },
    { id: "map", label: "Xaritada", icon: Map },
    { id: "station", label: "Filtr", icon: SlidersHorizontalIcon },
  ];

  // const stations = [
  //   {
  //     id: 1,
  //     pressure: 200,
  //     title: "Tashkent Methane Station",
  //     description:
  //       "Located in central Tashkent, offering high-quality methane gas for vehicles.",
  //     price: "3,950",
  //     rating: 4.5,
  //     image:
  //       "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  //   },
  //   {
  //     id: 2,
  //     pressure: 200,
  //     title: "Andijan Methane Gas Station",
  //     description:
  //       "Popular station in Andijan, known for reliable service and competitive prices.",
  //     price: "4,250",
  //     rating: 4.2,
  //     image:
  //       "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  //   },
  //   {
  //     id: 3,
  //     pressure: 200,
  //     title: "Samarkand Methane Station",
  //     description:
  //       "Conveniently located near Samarkand's main highway, offering fast refueling services.",
  //     price: "3,750",
  //     rating: 4.7,
  //     image:
  //       "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  //   },
  //   {
  //     id: 4,
  //     pressure: 200,
  //     title: "Bukhara Methane Gas Station",
  //     description:
  //       "A well-maintained station in Bukhara with modern facilities and quick service.",
  //     price: "4,000",
  //     rating: 4.3,
  //     image:
  //       "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  //   },
  //   {
  //     id: 5,
  //     pressure: 200,
  //     title: "Fergana Methane Station",
  //     description:
  //       "Located in Fergana, this station offers affordable prices and quick service.",
  //     price: "3,850",
  //     rating: 4.6,
  //     image:
  //       "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  //   },
  //   {
  //     id: 6,
  //     pressure: 190,
  //     title: "Navoi Methane Gas Station",
  //     description:
  //       "Navoi's top methane station with modern equipment and efficient service.",
  //     price: "4,150",
  //     rating: 4.1,
  //     image:
  //       "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  //   },
  //   {
  //     id: 7,
  //     pressure: 210,
  //     title: "Kashkadarya Kukdala Methane Station",
  //     description:
  //       "Located in the village of Kukdala, Kashkadarya region, serving local businesses and residents.",
  //     price: "3,800",
  //     rating: 4.5,
  //     image:
  //       "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  //   },
  //   {
  //     id: 8,
  //     pressure: 200,
  //     title: "Nukus Methane Gas Station",
  //     description:
  //       "Nukus-based station known for its clean facilities and friendly staff.",
  //     price: "4,200",
  //     rating: 4.4,
  //     image:
  //       "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  //   },
  //   {
  //     id: 9,
  //     pressure: 180,
  //     title: "Jizzakh Methane Station",
  //     description:
  //       "A popular stop for travelers passing through Jizzakh, offering quick refueling services.",
  //     price: "3,800",
  //     rating: 4.5,
  //     image:
  //       "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  //   },
  //   {
  //     id: 10,
  //     pressure: 200,
  //     title: "Khiva Methane Gas Station",
  //     description:
  //       "Located near Khiva’s historic center, this station is known for its efficient service.",
  //     price: "3,950",
  //     rating: 4.2,
  //     image:
  //       "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  //   },
  // ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <ScrollArea className="no-scrollbar w-full border-b">
        <div className="flex gap-2 p-4">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant="ghost"
              className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 `}
            >
              <filter.icon className="h-5 w-5" />
              {filter.label}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TgStations />

     
    </div>
  );
}
