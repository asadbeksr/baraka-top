import TgNavbar from "@/components/telegram/tg-navbar";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex flex-col">
      <TgNavbar />
      <main className="w-full max-w-screen-sm mx-auto flex-1">{children}</main>
    </div>
  );
}
