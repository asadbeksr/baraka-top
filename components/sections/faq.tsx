import { useParams } from "next/navigation";
import { useLocale } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const uzFaqItems: FaqItem[] = [
  {
    id: "item-1",
    question: "Metanchi nima?",
    answer:
      "Metanchi — bu xizmat metan yoqilg‘isi bilan yuradigan haydovchilar uchun. U zapravkalarining ish holati, navbatlar, gaz narxi va qulayliklar haqida real vaqt rejimida ma’lumot taqdim etadi.",
  },
  {
    id: "item-2",
    question: "Zapravka ishlayotganini qanday bilish mumkin?",
    answer:
      "Xarita orqali yoki Telegram botni ochib, zapravkaning holatini tekshirishingiz mumkin. Agar zapravka ochiq bo‘lsa, 'ochiq' degan belgi chiqadi.",
  },
  {
    id: "item-3",
    question: "Zapravkadagi navbatlarni ko‘rish mumkinmi?",
    answer:
      "Ha, Metanchi zapravkalarning to'ldirilganligini haqiqiy vaqt rejimida taqdim etadi, bu foydalanuvchilarga turli stansiyalar qanchalik to'ldirilganligini osonlik bilan bilib olish imkonini beradi. Bu uzoq kutishlarga yo'l qo'ymaslik va zapravkaga eng qulay vaqtni tanlash uchun yanada ma'lumotli qarorlar qabul qilishga yordam beradi",
  },
  {
    id: "item-4",
    question: "Qanday qilib eng yaqin zapravkani topsa bo‘ladi?",
    answer:
      "Poisk yoki xarita funksiyasidan foydalaning. Joylashuvingizni ko‘rsating va tizim sizga eng yaqin zapravkalarni masofa bilan ko‘rsatadi.",
  },
  {
    id: "item-5",
    question: "Gaz narxini tekshirsa bo‘ladimi?",
    answer: "Ha, har bir zapravkada kubometr metan narxi ko‘rsatiladi.",
  },
  {
    id: "item-6",
    question: "Qo‘shimcha qulayliklar haqida ma’lumot olish mumkinmi?",
    answer:
      "Metanchi orqali hojatxona, avtoturargoh, dam olish zonalari kabi xizmatlarni tekshirishingiz mumkin. Bu ma’lumotlar har bir zapravka kartochkasida ko‘rsatiladi.",
  },
  {
    id: "item-7",
    question: "Ma’lumotda xatolik bo‘lsa, nima qilish kerak?",
    answer:
      "Agar ma’lumot noto‘g‘ri yoki eskirgan bo‘lsa, fikr qoldirish yoki bot orqali qo‘llab-quvvatlash xizmatiga murojaat qilishingiz mumkin.",
  },
  {
    id: "item-8",
    question: "Bu xizmat pullimi?",
    answer: "Yo‘q, Metanchi xizmati mutlaqo bepul.",
  },
  {
    id: "item-9",
    question: "Zapravka haqida qanday fikr qoldirish mumkin?",
    answer:
      "Xarita yoki ro‘yxatdan zapravkani tanlang, 'Fikr qoldirish' tugmasini bosing va formani to‘ldiring. Fikringiz boshqa foydalanuvchilar uchun foydali bo‘ladi.",
  },
  {
    id: "item-10",
    question: "Mobil ilova bormi?",
    answer:
      "Hozircha Metanchi Telegram boti orqali ishlaydi. Biz to‘liq mobil ilovani yaratish ustida ishlayapmiz.",
  },
];

const ruFaqItems: FaqItem[] = [
  {
    id: "item-1",
    question: "Что такое Metanchi?",
    answer:
      "Metanchi — это сервис, который помогает автомобилистам находить метановые заправки, проверять их статус в реальном времени и узнавать актуальную информацию, такую как наличие очередей, цену за газ и доступные удобства.",
  },
  {
    id: "item-2",
    question: "Как узнать, работает ли заправка?",
    answer:
      "Вы можете открыть карту в приложении или Telegram-боте и проверить статус заправки. Если заправка работает, она будет отмечена как «открыта».",
  },
  {
    id: "item-3",
    question: "Могу ли я увидеть очередь на заправке?",
    answer:
      "Да, Metanchi предоставляет информацию о загруженности заправок в реальном времени, что позволяет пользователям легко узнать, насколько загружены те или иные станции. Это помогает принимать более информированные решения и выбирать оптимальное время для заправки, избегая длительных ожиданий в очередях.",
  },
  {
    id: "item-4",
    question: "Как найти ближайшую заправку?",
    answer:
      "Используйте встроенный поиск или карту. Укажите ваше местоположение, и система покажет ближайшие заправки с информацией о расстоянии и маршруте.",
  },
  {
    id: "item-5",
    question: "Можно ли посмотреть цену за газ?",
    answer:
      "Да, на каждой заправке указана актуальная цена за кубометр метана.",
  },
  {
    id: "item-6",
    question: "Какие дополнительные удобства я могу проверить?",
    answer:
      "На Metanchi вы можете узнать, есть ли на заправке туалет, парковка, зона отдыха или другие услуги. Эти данные указаны в карточке каждой заправки.",
  },
  {
    id: "item-7",
    question: "Как я могу сообщить об ошибке в данных?",
    answer:
      "Если вы заметили, что информация о заправке устарела или неверна, вы можете оставить отзыв или связаться с поддержкой через бота или форму на сайте.",
  },
  {
    id: "item-8",
    question: "Это бесплатный сервис?",
    answer: "Да, использование Metanchi абсолютно бесплатно.",
  },
  {
    id: "item-9",
    question: "Как оставить отзыв о заправке?",
    answer:
      "Выберите заправку на карте или в списке, нажмите «Оставить отзыв» и заполните форму. Ваш отзыв поможет другим пользователям.",
  },
  {
    id: "item-10",
    question: "Есть ли мобильное приложение?",
    answer:
      "Сейчас Metanchi доступен через Telegram-бот. Мы работаем над разработкой полноценного мобильного приложения.",
  },
];

const ozFaqItems: FaqItem[] = [
  {
    id: "item-1",
    question: "Metanchi нима?",
    answer:
      "Metanchi — бу сервис метан ёқилғиси билан юрадиган ҳайдовчилар учун. У заправкаларнинг иш ҳолати, навбатлар, газ нархи ва қулайликлар ҳақида реал вақтда маълумот тақдим этади.",
  },
  {
    id: "item-2",
    question: "Заправка ишлаётганини қандай билиш мумкин?",
    answer:
      "Харита орқали ёки Telegram ботни очиб, заправканинг ҳолатини текшириш мумкин. Агар заправка очиқ бўлса, «очиқ» деган белги чиқади.",
  },
  {
    id: "item-3",
    question: "Заправкадаги навбатларни кўриш мумкинми?",
    answer:
      "Ҳа, Metanchi навбатлар ҳақида IP-камералар ва ҳамкорлар маълумоти асосида маълумот беради.",
  },
  {
    id: "item-4",
    question: "Қандай қилиб энг яқин заправкани топса бўлади?",
    answer:
      "Поиск ёки харита функциясидан фойдаланинг. Жойлашувингизни кўрсатинг ва система сизга энг яқин заправкаларни масофа билан кўрсатади.",
  },
  {
    id: "item-5",
    question: "Газ нархини текширса бўладими?",
    answer: "Ҳа, ҳар бир заправкада кубометр метан нархи кўрсатилади.",
  },
  {
    id: "item-6",
    question: "Қўшимча қулайликлар ҳақида маълумот олиш мумкинми?",
    answer:
      "Metanchi орқали туалет, парковка, дам олиш зоналари каби хизматларни текшириш мумкин. Бу маълумотлар ҳар бир заправка карточкасида кўрсатилади.",
  },
  {
    id: "item-7",
    question: "Маълумотда хатолик бўлса, нима қилиш керак?",
    answer:
      "Агар маълумот нотўғри ёки эскирган бўлса, фикр қолдириш ёки бот орқали қўллаб-қувватлаш хизматига мурожаат қилиш мумкин.",
  },
  {
    id: "item-8",
    question: "Бу хизмат пуллими?",
    answer: "Йўқ, Metanchi хизмати мутлақо бепул.",
  },
  {
    id: "item-9",
    question: "Заправка ҳақида қандай фикр қолдирса бўлади?",
    answer:
      "Харита ёки рўйхатдан заправкани танланг, «Фикр қолдириш» тугмасини босинг ва формани тўлдиринг. Фикрингиз бошқа фойдаланувчилар учун фойдали бўлади.",
  },
  {
    id: "item-10",
    question: "Мобил илова борми?",
    answer:
      "Ҳозирча Metanchi Telegram боти орқали ишлайди. Биз тўлиқ мобил иловани яратиш устида ишлаяпмиз.",
  },
];

const faqContent: Record<string, { title: string; items: FaqItem[] }> = {
  oz: {
    title: "Тез-тез сўраладиган саволлар",
    items: ozFaqItems,
  },
  ru: {
    title: "Часто задаваемые вопросы",
    items: ruFaqItems,
  },
  uz: {
    title: "Tez-tez so‘raladigan savollar",
    items: uzFaqItems,
  },
};

export default function FaqSection() {
  const lang = useLocale();
  const content = faqContent[lang];

  // Split items into two arrays for two columns
  const midPoint = Math.ceil(content.items.length / 2);
  const firstColumn = content.items.slice(0, midPoint);
  const secondColumn = content.items.slice(midPoint);

  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
            {content.title}
          </h2>
          <div className="grid w-full max-w-6xl md:gap-10 md:grid-cols-2">
            {/* First Column */}
            <div>
              <Accordion type="single" collapsible className="w-full">
                {firstColumn.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            {/* Second Column */}
            <div>
              <Accordion type="single" collapsible className="w-full">
                {secondColumn.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
