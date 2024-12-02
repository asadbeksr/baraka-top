"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookmarkIcon,
  ClockIcon,
  GaugeIcon,
  HeartIcon,
  MapPin,
  ParkingCircleIcon,
  SaveIcon,
  Share2Icon,
  ShoppingCartIcon,
  StarIcon,
  WifiIcon,
} from "lucide-react";

import { cn, formatPricePerM3 } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "../ui/carousel";

interface Amenity {
  id: string;
  name: string;
  icon: string;
}

interface Station {
  id: string;
  name: string | null;
  address?: string | null;
  price?: number | null;
  pressure?: number | null;
  rating?: number | null;
  amenities?: { amenityId: string; amenity: Amenity }[];
  imageUrl?: string | null;
  landmark?: string | null;
  legalName?: string | null;
  columnsCount?: number | null;
  gasTemperature?: number | null;
  methaneDensity?: number | null;
  cameraIP?: string | null;
  phoneNumber?: string | null;
  region?: string | null;
  website?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

interface StationCardProps {
  station: Station;
  variant?: "default" | "compact";
  onShare?: () => void;
  onSave?: () => void;
  showAmenities?: boolean;
  showActions?: boolean;
  className?: string;
  distance?: number;
}

const formatDistance = (distance: number): string => {
  if (distance < 1) {
    // If less than 1 km, show in meters
    return `${Math.round(distance * 1000)}m`;
  }
  // If 1 km or more, show in kilometers with one decimal
  return `${distance.toFixed(1)}km`;
};

export function StationCard({
  station,
  variant = "default",
  onShare,
  onSave,
  showAmenities = true,
  showActions = true,
  className = "",
  distance,
}: StationCardProps) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    console.log(`Heart button is now ${!liked ? "liked" : "unliked"}`);
    // Add additional logic (e.g., API call) here
  };

  return (
    <Card className={`bg-card shadow-xl ${className}`}>
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Carousel className="w-full">
            <CarouselContent>
              {[1, 2, 3, 4].map((_, index) => (
                <CarouselItem key={index}>
                  <Image
                    src="https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg"
                    alt={`Football field ${index + 1}`}
                    width={800}
                    height={400}
                    className="aspect-video w-full rounded-t-md object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots />
          </Carousel>

          {/* <Image
            src={
              station.imageUrl ||
              "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg"
            }
            alt={station.name || "Station image"}
            fill
            className="rounded-t-lg object-cover"
          /> */}
          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            {typeof distance === "number" && (
              <Badge className="flex items-center gap-1 text-sm">
                <MapPin className="h-3 w-3" />
                {formatDistance(distance)}
              </Badge>
            )}
            {station.rating && (
              <Badge
                variant="default"
                className="flex items-center gap-1 bg-green-600 text-sm text-white"
              >
                <StarIcon className="h-4 w-4 fill-white" />
                {station.rating}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <Link href={`/telegram/stations/${station.id}`}>
          <h3 className="mb-1 max-w-full truncate text-xl font-bold">
            {station.name || "No name"}
          </h3>

          {station.address && (
            <p className="max-w-full truncate text-gray-400">
              {station.address || "No name"}
            </p>
          )}
        </Link>
      </CardContent>

      {variant === "default" && (
        <>
          <CardFooter className="just flex w-full flex-wrap items-center justify-between gap-2 p-4 pb-3 pt-0">
            <p
              className={cn(
                "font-medium",
                station.price ? "text-green-600" : "text-muted-foreground",
              )}
            >
              {formatPricePerM3(station.price)}
            </p>

            {showActions && (
              <div className="flex justify-between gap-2">
                {onSave && (
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={toggleLike}
                    className="border"
                  >
                    <BookmarkIcon
                      className={`h-5 w-5 ${
                        liked ? "fill-current text-red-500" : ""
                      }`}
                    />
                  </Button>
                )}

                {onShare && (
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={onShare}
                    className="border"
                  >
                    <Share2Icon className="h-5 w-5" />
                  </Button>
                )}

                <Link href={`/telegram/stations/${station.id}`}>
                  <Button className="bg-primary">Batafsil</Button>
                </Link>
              </div>
            )}
          </CardFooter>

          {showAmenities && (
            <CardFooter className="flex flex-wrap items-center gap-2 p-4 text-sm">
              {station.pressure && (
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                  <GaugeIcon className="text-lg" />
                  <span>{station.pressure} bar</span>
                </div>
              )}

              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <ClockIcon className="text-lg" />
                <span>24/7</span>
              </div>

              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <ParkingCircleIcon className="text-lg" />
              </div>

              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <ShoppingCartIcon className="text-lg" />
              </div>

              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <WifiIcon className="text-lg" />
              </div>

              {/* Prayer Mat Icon */}
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#facc14"
                  height="1.5em"
                  width="1.5em"
                >
                  <path d="M20.772 13.155l-1.368-4.104A2.995 2.995 0 0016.559 7H7.441a2.995 2.995 0 00-2.845 2.051l-1.368 4.104A2.001 2.001 0 002 15v3c0 .738.404 1.376 1 1.723V21a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-1.277A1.99 1.99 0 0022 18v-3c0-.831-.507-1.542-1.228-1.845zM7.441 9h9.117a1 1 0 01.949.684L18.613 13H5.387l1.105-3.316c.137-.409.519-.684.949-.684zM5.5 18a1.5 1.5 0 11.001-3.001A1.5 1.5 0 015.5 18zm13 0a1.5 1.5 0 11.001-3.001A1.5 1.5 0 0118.5 18zM9 4.378c.005-1.088-1.037-2.051-1.387-2.344a.176.176 0 00-.228 0C7.033 2.325 5.995 3.271 6 4.377 6 5.272 6.673 6 7.5 6S9 5.272 9 4.378zm4.5 0c.005-1.088-1.037-2.052-1.387-2.344a.176.176 0 00-.228 0c-.353.291-1.391 1.238-1.386 2.344C10.5 5.272 11.173 6 12 6s1.5-.728 1.5-1.622zm4.5 0c.005-1.088-1.037-2.052-1.387-2.344a.176.176 0 00-.228 0c-.352.291-1.39 1.237-1.385 2.343C15 5.272 15.673 6 16.5 6S18 5.272 18 4.378z" />
                </svg>
              </div>

              {/* Car Wash Icon */}
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="#facc14"
                  height="1.5em"
                  width="1.5em"
                >
                  <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1"></path>
                  <path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
                  <path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
                  <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z"></path>
                  <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555"></path>
                </svg>
              </div>

              {/* Cafe Icon */}
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
          )}
        </>
      )}
    </Card>
  );
}
