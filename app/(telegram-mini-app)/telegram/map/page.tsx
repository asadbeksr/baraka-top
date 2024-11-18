import dynamic from "next/dynamic";

// import TgMapComponent from "@/components/telegram/tg-map";

// инициализация и использование карты внутри, включая Script, загружающий код карт
const TgMapComponent = dynamic(async () => import('@/components/telegram/tg-map'), {
  ssr: false,
});

export default function TgMap() {
  return (
    <>
      hello
      <TgMapComponent />;
    </>
  );
}
