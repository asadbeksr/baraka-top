'use client'

import { Globe, Map, Menu, Heart, Share2, Star } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useState } from "react"
import Image from "next/image"

export default function TgSaved() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'Hudud', icon: Globe },
    { id: 'map', label: 'Xaritada', icon: Map },
    { id: 'stadium', label: 'Stadion turi', icon: Menu },
  ]

  const stadiums = [
    {
      id: 1,
      title: '229-maktab stadion',
      description: "Cho'pon Ota, jome masjidiga yaqin 229-m",
      price: "200 000 so'm",
      rating: 5,
      image: "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
    {
      id: 2,
      title: 'Sport Complex Stadium',
      description: "Professional football stadium with night lighting",
      price: "250 000 so'm",
      rating: 4,
      image: "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
    {
      id: 3,
      title: '20-maktab stadion',
      description: "Cho'pon Ota, jome masjidiga yaqin 229-m",
      price: "200 000 so'm",
      rating: 5,
      image: "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
    {
      id: 4,
      title: 'Bunyodkor',
      description: "Professional football stadium with night lighting",
      price: "250 000 so'm",
      rating: 4,
      image: "https://www.gazeta.uz/media/img/2023/02/XQi2ON16754157026113_b.jpg",
    },
  ]

  return (
    <div className="flex flex-col w-full min-h-screen bg-card text-white">
        <CardHeader>
        <h1 className="text-2xl font-bold">Saqlanganlar</h1>
        </CardHeader>
 

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {stadiums.map((stadium) => (
          <Card key={stadium.id} className="bg-card">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={stadium.image}
                  alt={stadium.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{stadium.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-2">{stadium.title}</h3>
              <p className="text-gray-400">{stadium.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex flex-wrap items-center gap-2">
              <span className="text-blue-500 font-semibold">{stadium.price}</span>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="rounded-full">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600">Batafsil</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
