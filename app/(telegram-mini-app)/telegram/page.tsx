"use client";

import { useState } from "react";
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

export default function TgHome() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Hudud", icon: Globe },
    { id: "map", label: "Xaritada", icon: Map },
    { id: "station", label: "Filtr", icon: SlidersHorizontalIcon },
  ];

  const stations = [
    {
      id: 1,
      pressure: 200,
      title: "Tashkent Methane Station",
      description:
        "Located in central Tashkent, offering high-quality methane gas for vehicles.",
      price: "3,950",
      rating: 4.5,
      image:
        "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
    {
      id: 2,
      pressure: 200,
      title: "Andijan Methane Gas Station",
      description:
        "Popular station in Andijan, known for reliable service and competitive prices.",
      price: "4,250",
      rating: 4.2,
      image:
        "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
    {
      id: 3,
      pressure: 200,
      title: "Samarkand Methane Station",
      description:
        "Conveniently located near Samarkand's main highway, offering fast refueling services.",
      price: "3,750",
      rating: 4.7,
      image:
        "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
    {
      id: 4,
      pressure: 200,
      title: "Bukhara Methane Gas Station",
      description:
        "A well-maintained station in Bukhara with modern facilities and quick service.",
      price: "4,000",
      rating: 4.3,
      image:
        "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
    {
      id: 5,
      pressure: 200,
      title: "Fergana Methane Station",
      description:
        "Located in Fergana, this station offers affordable prices and quick service.",
      price: "3,850",
      rating: 4.6,
      image:
        "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
    {
      id: 6,
      pressure: 190,
      title: "Navoi Methane Gas Station",
      description:
        "Navoi's top methane station with modern equipment and efficient service.",
      price: "4,150",
      rating: 4.1,
      image:
        "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
    {
      id: 7,
      pressure: 210,
      title: "Kashkadarya Kukdala Methane Station",
      description:
        "Located in the village of Kukdala, Kashkadarya region, serving local businesses and residents.",
      price: "3,800",
      rating: 4.5,
      image:
        "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
    {
      id: 8,
      pressure: 200,
      title: "Nukus Methane Gas Station",
      description:
        "Nukus-based station known for its clean facilities and friendly staff.",
      price: "4,200",
      rating: 4.4,
      image:
        "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
    {
      id: 9,
      pressure: 180,
      title: "Jizzakh Methane Station",
      description:
        "A popular stop for travelers passing through Jizzakh, offering quick refueling services.",
      price: "3,800",
      rating: 4.5,
      image:
        "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
    {
      id: 10,
      pressure: 200,
      title: "Khiva Methane Gas Station",
      description:
        "Located near Khiva’s historic center, this station is known for its efficient service.",
      price: "3,950",
      rating: 4.2,
      image:
        "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <ScrollArea className="no-scrollbar w-full border-b">
        <div className="flex gap-2 p-4">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant="ghost"
              className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 ${activeFilter === filter.id ? "bg-primary text-primary-foreground" : "text-gray-400"}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <filter.icon className="h-5 w-5" />
              {filter.label}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="mb-20 flex-1 space-y-4 overflow-auto p-4">
        {stations.map((station) => (
          <Card key={station.id} className="bg-card">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={station.image}
                  alt={station.title}
                  fill
                  className="rounded-t-lg object-cover"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-white">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{station.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <h3 className="mb-2 text-xl font-bold">{station.title}</h3>
              <p className="text-gray-400">{station.description}</p>
            </CardContent>

            <CardFooter className="just flex flex-wrap items-center justify-between gap-2 p-4 py-0 w-full">

              <span className="font-semibold text-primary">
                {station.price} so&apos;m / m³
              </span>

              <div className="flex justify-between">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Heart className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>

              <Link href={`/telegram/stations/${station.id}`}>
              <Button className="bg-primary ml-2">Batafsil</Button>
              </Link>
              </div>

            </CardFooter>

            <CardFooter className="flex flex-wrap items-center gap-2 p-4 text-sm">
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <Gauge className="h-5 w-5 text-primary" />
                <span>{station.pressure} bar</span>
              </div>

              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <ClockIcon className="h-5 w-5 text-primary" />
                <span> 24/7</span>
              </div>

              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <ParkingCircle className="h-5 w-5 text-primary" />
              </div>

              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                {/* <StoreIcon className="h-5 w-5 text-primary" /> */}
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>

              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <WifiIcon className="h-5 w-5 text-primary" />
              </div>

              {/* TOILET */}
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <svg
                  viewBox="0 0 16 16"
                  fill="#facc14"
                  height="1.5em"
                  width="1.5em"
                >
                  <path d="M10.348 7.643c0-1.112.488-1.754 1.318-1.754.682 0 1.139.47 1.187 1.108H14v-.11c-.053-1.187-1.024-2-2.342-2-1.604 0-2.518 1.05-2.518 2.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114h-1.147c-.048.615-.497 1.05-1.187 1.05-.839 0-1.318-.62-1.318-1.727v-.742zM4.457 11l1.02-4.184h.045L6.542 11h1.006L9 5.001H7.818l-.82 4.355h-.056L5.97 5.001h-.94l-.972 4.355h-.053l-.827-4.355H2L3.452 11h1.005z" />
                  <path d="M14 3a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1h12zM2 2a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H2z" />
                </svg>
              </div>

              {/* CAR WASH */}
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="#facc14"
                  height="1.5em"
                  width="1.5em"
                >
                  <path d="M20.772 13.155l-1.368-4.104A2.995 2.995 0 0016.559 7H7.441a2.995 2.995 0 00-2.845 2.051l-1.368 4.104A2.001 2.001 0 002 15v3c0 .738.404 1.376 1 1.723V21a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-1.277A1.99 1.99 0 0022 18v-3c0-.831-.507-1.542-1.228-1.845zM7.441 9h9.117a1 1 0 01.949.684L18.613 13H5.387l1.105-3.316c.137-.409.519-.684.949-.684zM5.5 18a1.5 1.5 0 11.001-3.001A1.5 1.5 0 015.5 18zm13 0a1.5 1.5 0 11.001-3.001A1.5 1.5 0 0118.5 18zM9 4.378c.005-1.088-1.037-2.051-1.387-2.344a.176.176 0 00-.228 0C7.033 2.325 5.995 3.271 6 4.377 6 5.272 6.673 6 7.5 6S9 5.272 9 4.378zm4.5 0c.005-1.088-1.037-2.052-1.387-2.344a.176.176 0 00-.228 0c-.353.291-1.391 1.238-1.386 2.344C10.5 5.272 11.173 6 12 6s1.5-.728 1.5-1.622zm4.5 0c.005-1.088-1.037-2.052-1.387-2.344a.176.176 0 00-.228 0c-.352.291-1.39 1.237-1.385 2.343C15 5.272 15.673 6 16.5 6S18 5.272 18 4.378z" />
                </svg>
              </div>

              {/* PRAYING MAT  */}
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 135.467 135.467"
                  id="prayer-mat"
                >
                  <path
                    d="M30.553 0a2.882 2.882 0 0 0-2.883 2.88v9.033a2.882 2.882 0 0 0 0 .096 2.883 2.883 0 0 0 0 .096v111.068a2.883 2.883 0 0 0 .01.191 2.882 2.882 0 0 0-.01.19v9.03a2.882 2.882 0 0 0 2.883 2.883 2.882 2.882 0 0 0 2.883-2.883v-6.528h9.107v6.528a2.882 2.882 0 0 0 2.883 2.883 2.882 2.882 0 0 0 2.881-2.883v-6.528h9.109v6.528a2.882 2.882 0 0 0 2.88 2.883 2.882 2.882 0 0 0 2.884-2.883v-6.528h9.107v6.528a2.882 2.882 0 0 0 2.883 2.883 2.882 2.882 0 0 0 2.883-2.883v-6.528h9.107v6.528a2.882 2.882 0 0 0 2.883 2.883 2.882 2.882 0 0 0 2.88-2.883v-6.528h9.11v6.528a2.882 2.882 0 0 0 2.88 2.883 2.882 2.882 0 0 0 2.884-2.883v-9.03a2.882 2.882 0 0 0-.011-.19 2.883 2.883 0 0 0 .01-.191V12.105a2.883 2.883 0 0 0 0-.098 2.882 2.882 0 0 0 0-.094V2.88A2.882 2.882 0 0 0 104.914 0a2.882 2.882 0 0 0-2.88 2.88v6.344h-9.11V2.88A2.882 2.882 0 0 0 90.044 0a2.882 2.882 0 0 0-2.883 2.88v6.344h-9.107V2.88A2.882 2.882 0 0 0 75.17 0a2.882 2.882 0 0 0-2.883 2.88v6.344H63.18V2.88A2.882 2.882 0 0 0 60.297 0a2.882 2.882 0 0 0-2.881 2.88v6.344h-9.109V2.88A2.882 2.882 0 0 0 45.426 0a2.882 2.882 0 0 0-2.883 2.88v6.344h-9.107V2.88A2.882 2.882 0 0 0 30.553 0Zm2.881 14.988h68.596v105.304H33.434Zm34.257 13.019a2.883 2.883 0 0 0-.017 0 2.883 2.883 0 0 0-1.783.664c-4.015 3.335-8.001 5.01-11.564 6.556-3.563 1.545-7.178 2.984-8.835 6.76a2.883 2.883 0 0 0-.242 1.16v61.242a2.883 2.883 0 0 0 2.883 2.883h39.202a2.883 2.883 0 0 0 2.883-2.883V42.982a2.883 2.883 0 0 0-.294-1.268c-1.795-3.66-5.384-4.996-8.928-6.513-3.544-1.517-7.477-3.186-11.398-6.51a2.883 2.883 0 0 0-1.907-.684Zm.029 6.33c4.012 2.973 7.961 4.86 11.007 6.164 3.25 1.391 5.004 2.416 5.725 3.482v57.525h-33.44V44.065c.66-1.115 2.337-2.131 5.606-3.548 3.035-1.317 7.022-3.205 11.102-6.18z"
                    color="#facc14"
                    fill="#facc14"
                    font-family="sans-serif"
                    font-weight="400"
                    overflow="visible"
                  ></path>
                </svg>
              </div>

              {/* Caffe */}
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="#facc14"
                  width="24"
                  height="24"
                  strokeWidth="2"
                >
                  <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1"></path>
                  <path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
                  <path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
                  <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z"></path>
                  <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555"></path>
                </svg>
              </div>

            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
