import "@/styles/globals.css";

import { fontGeist, fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { cn, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@/components/analytics";
import ModalProvider from "@/components/modals/providers";
import Script from "next/script";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

type Locale = "oz" | "uz" | "ru";

const getLocale = (locale: Locale): string => {
  switch (locale) {
    case "oz":
      return "uz_cyrl";
    case "uz":
      return "uz_latn";
    case "ru":
      return "ru";
    default:
      return "uz";
  }
};

export const metadata = constructMetadata();

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={getLocale(params.locale)} suppressHydrationWarning>
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-transparent font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
          fontGeist.variable,
          fontHeading.variable
        )}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider>{children}</ModalProvider>
            <Analytics />
            <Toaster richColors closeButton />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
