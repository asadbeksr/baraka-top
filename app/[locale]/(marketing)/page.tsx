import { infos } from "@/config/landing";
import BentoGrid from "@/components/sections/bentogrid";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import Powered from "@/components/sections/powered";
import PreviewLanding from "@/components/sections/preview-landing";
import Testimonials from "@/components/sections/testimonials";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon, InfoIcon, MapPinIcon, MessageSquareIcon, Search, ThumbsUpIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem } from "@radix-ui/react-accordion";
import { AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import FaqSection from "@/components/sections/faq";

export default function IndexPage() {
  const t = useTranslations("HomePage");

  return (
    <>
      <HeroLanding />
      
      {/* <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Metanchi — Ваш помощник на метановых заправках
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                С помощью Metanchi вы всегда будете в курсе актуальной информации о метановых заправках. Найдите ближайшую заправку, проверьте очередь и узнайте цену на газ — все в одном месте!
              </p>
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                Начать
              </Button>
            </div>
          </div>
        </section> */}

        {/* <section className="w-full mx-auto py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container max-w-6xl px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Как пользоваться
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Metanchi — это сервис, который помогает вам получать актуальную информацию о метановых заправках прямо на вашем устройстве.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                <Card>
                  <CardHeader>
                    <Search className="w-10 h-10 mb-4 text-purple-500" />
                    <CardTitle>Поиск заправок</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Найдите ближайшую заправку на карте.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <InfoIcon className="w-10 h-10 mb-4 text-purple-500" />
                    <CardTitle>Актуальная информация</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Узнайте, открыта ли заправка, цену за кубометр газа и наличие очереди.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <MessageSquareIcon className="w-10 h-10 mb-4 text-purple-500" />
                    <CardTitle>Обратная связь</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Оставьте отзывы и сообщайте об изменениях на заправках.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full mx-auto py-12 md:py-24 lg:py-32">
          <div className="container max-w-6xl px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Основные функции
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                <Card>
                  <CardHeader>
                    <MapPinIcon className="w-10 h-10 mb-4 text-purple-500" />
                    <CardTitle>Поиск заправок</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Легко находите ближайшую метановую заправку и строите маршрут до неё.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <ClockIcon className="w-10 h-10 mb-4 text-purple-500" />
                    <CardTitle>Актуальная информация</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Узнайте статус заправки, цену за газ и доступность удобств.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <ThumbsUpIcon className="w-10 h-10 mb-4 text-purple-500" />
                    <CardTitle>Обратная связь</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Оставляйте отзывы и помогайте другим пользователям найти актуальную информацию.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Преимущества использования Metanchi
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                <Card>
                  <CardHeader>
                    <ClockIcon className="w-10 h-10 mb-4 text-purple-500" />
                    <CardTitle>Экономия времени</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Не нужно тратить время на поиск работающей заправки или стоять в очереди.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <ThumbsUpIcon className="w-10 h-10 mb-4 text-purple-500" />
                    <CardTitle>Удобство</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Вся информация доступна в одно место, всегда под рукой.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <InfoIcon className="w-10 h-10 mb-4 text-purple-500" />
                    <CardTitle>Актуальность</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Данные регулярно обновляются, что обеспечивает их достоверность.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section> */}

        <FaqSection />

    


      {/* <PreviewLanding />
      <Powered />
      <BentoGrid />
      <InfoLanding data={infos[0]} reverse={true} />
      <Features />
      <Testimonials /> */}
    </>
  );
}
