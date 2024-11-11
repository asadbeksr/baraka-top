import Image from "next/image";
import Link from "next/link";
import { ClockIcon, GaugeIcon, GlassWater, ParkingCircle, ShoppingCartIcon, WifiIcon } from "lucide-react";
import {
  Bath,
  Car,
  Coffee,
  Grip,
  Leaf,
  Music2,
  Shirt,
  Train,
  Users,
  Wifi,
  Wind,
  Bookmark, Navigation, Share2, StarIcon 
} from "lucide-react"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";

const nearbyStations = [
  {
    id: 3,
    pressure: 220,
    title: "Samarkand Methane Station",
    description:
      "Conveniently located near Samarkand's main highway, offering fast refueling services.",
    price: "3,750",
    rating: 4.7,
    image: "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  },
  {
    id: 4,
    pressure: 200,
    title: "Bukhara Methane Gas Station",
    description:
      "A well-maintained station in Bukhara with modern facilities and quick service.",
    price: "4,000",
    rating: 4.3,
    image: "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  },
  {
    id: 6,
    pressure: 210,
    title: "Bukhara Methane Gas Station",
    description:
      "A well-maintained station in Bukhara with modern facilities and quick service.",
    price: "4,000",
    rating: 4.3,
    image: "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
  },
];
const amenities = [
  {
    icon: <ClockIcon className="h-5 w-5" />,
    label: "24/7",
  },
  {
    icon: (
      <svg
        viewBox="0 0 16 16"
        // fill="#facc14"
        fill="#fff"
        height="1.5em"
        width="1.5em"
      >
        <path d="M10.348 7.643c0-1.112.488-1.754 1.318-1.754.682 0 1.139.47 1.187 1.108H14v-.11c-.053-1.187-1.024-2-2.342-2-1.604 0-2.518 1.05-2.518 2.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114h-1.147c-.048.615-.497 1.05-1.187 1.05-.839 0-1.318-.62-1.318-1.727v-.742zM4.457 11l1.02-4.184h.045L6.542 11h1.006L9 5.001H7.818l-.82 4.355h-.056L5.97 5.001h-.94l-.972 4.355h-.053l-.827-4.355H2L3.452 11h1.005z" />
        <path d="M14 3a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1h12zM2 2a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H2z" />
      </svg>
    ),
    label: "Xojatxona",
  },
  {
    icon: <ParkingCircle className="h-5 w-5" />,
    label: "Avtoturargoh",
  },
  {
    icon: <ShoppingCartIcon className="h-5 w-5" />,
    label: "Do'kon",
  },
  {
    icon: <WifiIcon className="h-5 w-5" />,
    label: "Tekin Wi-Fi",
  },

  {
    icon: (
      <svg
        viewBox="0 0 24 24"
          // fill="#facc14"
        fill="#fff"
        height="1.5em"
        width="1.5em"
      >
        <path d="M20.772 13.155l-1.368-4.104A2.995 2.995 0 0016.559 7H7.441a2.995 2.995 0 00-2.845 2.051l-1.368 4.104A2.001 2.001 0 002 15v3c0 .738.404 1.376 1 1.723V21a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-1.277A1.99 1.99 0 0022 18v-3c0-.831-.507-1.542-1.228-1.845zM7.441 9h9.117a1 1 0 01.949.684L18.613 13H5.387l1.105-3.316c.137-.409.519-.684.949-.684zM5.5 18a1.5 1.5 0 11.001-3.001A1.5 1.5 0 015.5 18zm13 0a1.5 1.5 0 11.001-3.001A1.5 1.5 0 0118.5 18zM9 4.378c.005-1.088-1.037-2.051-1.387-2.344a.176.176 0 00-.228 0C7.033 2.325 5.995 3.271 6 4.377 6 5.272 6.673 6 7.5 6S9 5.272 9 4.378zm4.5 0c.005-1.088-1.037-2.052-1.387-2.344a.176.176 0 00-.228 0c-.353.291-1.391 1.238-1.386 2.344C10.5 5.272 11.173 6 12 6s1.5-.728 1.5-1.622zm4.5 0c.005-1.088-1.037-2.052-1.387-2.344a.176.176 0 00-.228 0c-.352.291-1.39 1.237-1.385 2.343C15 5.272 15.673 6 16.5 6S18 5.272 18 4.378z" />
      </svg>
    ),
    label: "Moyka",
  },
  {
    icon: (
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 135.467 135.467"
      id="prayer-mat"
    >
      <path
        d="M30.553 0a2.882 2.882 0 0 0-2.883 2.88v9.033a2.882 2.882 0 0 0 0 .096 2.883 2.883 0 0 0 0 .096v111.068a2.883 2.883 0 0 0 .01.191 2.882 2.882 0 0 0-.01.19v9.03a2.882 2.882 0 0 0 2.883 2.883 2.882 2.882 0 0 0 2.883-2.883v-6.528h9.107v6.528a2.882 2.882 0 0 0 2.883 2.883 2.882 2.882 0 0 0 2.881-2.883v-6.528h9.109v6.528a2.882 2.882 0 0 0 2.88 2.883 2.882 2.882 0 0 0 2.884-2.883v-6.528h9.107v6.528a2.882 2.882 0 0 0 2.883 2.883 2.882 2.882 0 0 0 2.883-2.883v-6.528h9.107v6.528a2.882 2.882 0 0 0 2.883 2.883 2.882 2.882 0 0 0 2.88-2.883v-6.528h9.11v6.528a2.882 2.882 0 0 0 2.88 2.883 2.882 2.882 0 0 0 2.884-2.883v-9.03a2.882 2.882 0 0 0-.011-.19 2.883 2.883 0 0 0 .01-.191V12.105a2.883 2.883 0 0 0 0-.098 2.882 2.882 0 0 0 0-.094V2.88A2.882 2.882 0 0 0 104.914 0a2.882 2.882 0 0 0-2.88 2.88v6.344h-9.11V2.88A2.882 2.882 0 0 0 90.044 0a2.882 2.882 0 0 0-2.883 2.88v6.344h-9.107V2.88A2.882 2.882 0 0 0 75.17 0a2.882 2.882 0 0 0-2.883 2.88v6.344H63.18V2.88A2.882 2.882 0 0 0 60.297 0a2.882 2.882 0 0 0-2.881 2.88v6.344h-9.109V2.88A2.882 2.882 0 0 0 45.426 0a2.882 2.882 0 0 0-2.883 2.88v6.344h-9.107V2.88A2.882 2.882 0 0 0 30.553 0Zm2.881 14.988h68.596v105.304H33.434Zm34.257 13.019a2.883 2.883 0 0 0-.017 0 2.883 2.883 0 0 0-1.783.664c-4.015 3.335-8.001 5.01-11.564 6.556-3.563 1.545-7.178 2.984-8.835 6.76a2.883 2.883 0 0 0-.242 1.16v61.242a2.883 2.883 0 0 0 2.883 2.883h39.202a2.883 2.883 0 0 0 2.883-2.883V42.982a2.883 2.883 0 0 0-.294-1.268c-1.795-3.66-5.384-4.996-8.928-6.513-3.544-1.517-7.477-3.186-11.398-6.51a2.883 2.883 0 0 0-1.907-.684Zm.029 6.33c4.012 2.973 7.961 4.86 11.007 6.164 3.25 1.391 5.004 2.416 5.725 3.482v57.525h-33.44V44.065c.66-1.115 2.337-2.131 5.606-3.548 3.035-1.317 7.022-3.205 11.102-6.18z"
        // fill="#facc14"
        fill="#fff"
        font-family="sans-serif"
        font-weight="400"
        overflow="visible"
      ></path>
    </svg>
    ),
    label: "Namozxona",
  },
   {
    icon: <Coffee className="h-6 w-6" />,
    label: "Kafe",
  },
];

// mijozlar jutish honasi


export default function TgStationSingle() {
  return (
    <div className="min-h-screen bg-black pb-20 text-white">
        <div className="relative aspect-video">
         <img src="http://97.68.104.34:80/mjpg/video.mjpg" alt="Live Camera Feed" width="100%" height="auto" />
         </div>
      {/* <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3, 4].map((_, index) => (
            <CarouselItem key={index}>
              <Image
                src="https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg"
                alt={`Football field ${index + 1}`}
                width={800}
                height={400}
                className="aspect-video w-full object-cover rounded-b-xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel> */}

      <div className="space-y-3 p-6">
        <h1 className="text-2xl font-bold text-primary">Shaffof - Metan</h1>

        <div className="grid grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="bg-card flex h-auto flex-col items-center gap-2 py-4"
          >
            <Bookmark className="h-6 w-6" />
            <span>Saqlash</span>
          </Button>
          <Button
            variant="outline"
            className="bg-card flex h-auto flex-col items-center gap-2 py-4"
          >
            <Share2 className="h-6 w-6" />
            <span>Ulashish</span>
          </Button>
          <Button
            variant="outline"
            className="bg-card  flex h-auto flex-col items-center gap-2 py-4"
          >
            <Navigation className="h-6 w-6" />
            <span>Borish</span>
          </Button>
        </div>
      </div>

      <div className="space-y-3 p-6">
        <h2 className="text-2xl font-bold">Qulayliklar</h2>

        <Card className="grid grid-cols-2 gap-y-6 gap-x-4 p-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-shrink-0 w-6">{amenity.icon}</div>
            <span className="text-lg">{amenity.label}</span>
          </div>
        ))}
      </Card>
         
      </div>

      <div className="space-y-3 p-6">
        <h2 className="text-2xl font-bold"> Xaritada joylashuvi</h2>
          <div className="relative aspect-video">
            <Image
              src="/_static/map.png"
              alt="map image"
              fill
              className="rounded-md object-cover"
            />
          </div>
      </div>

      {/* Nearby Stadiums Section */}
      <div className="space-y-3 p-6">
        <h2 className="text-2xl font-bold">Yaqin shahobchalar</h2>
        <div className="no-scrollbar flex gap-4 overflow-scroll pb-4">
          {nearbyStations.map((station) => (
            <Card key={station.id} className="w-[280px] flex-none">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={station.image}
                    alt={station.title}
                    fill
                    className="rounded-t-lg object-cover"
                  />
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-white">
                    <StarIcon className="h-4 w-4 fill-current" />
                    <span>{station.rating}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 p-4">
                <h3 className="text-lg font-bold">{station.title}</h3>
                <p className="text-sm text-gray-400">{station.description}</p>
                <div className="mt-2 flex w-full items-center justify-between">
                  <span className="font-semibold">
                    {station.price} so&apos;m / m³
                  </span>

                  <Link href={`/telegram/stations/${station.id}`}>
                    <Button className="ml-2 bg-primary">Batafsil</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
