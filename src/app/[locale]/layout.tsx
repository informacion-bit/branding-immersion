import type { Metadata } from "next";
import "./globals.css";
import { getMessages } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import { GoogleTagManager } from '@next/third-parties/google';
import ChatbotLoader from '@/components/ChatbotLoader';
import Script from 'next/script';
import { Providers } from "@/components/Providers";

const GCS_BUCKET_URL = "https://storage.googleapis.com/immersion-005-7e407.appspot.com/imagenesImmersion";

// Metadatos optimizados
export const metadata: Metadata = {
  title: "Immersion Agency - Estrategias Digitales Personalizadas",
  description: "Creamos estrategias digitales personalizadas que impulsan tu negocio.",
  keywords: "Marketing Digital, Desarrollo Web, UX/UI, SEO, SEM, Producción Audiovisual",
  authors: [{ name: "Immersion Agency", url: "https://www.immersionagency.com" }],
  robots: "index, follow",
  openGraph: {
    title: "Immersion Agency - Estrategias Digitales",
    description: "Desarrollamos estrategias digitales a medida que impulsan tu negocio.",
    type: "website",
    url: "https://www.immersionagency.com",
    images: [
      {
        url: `${GCS_BUCKET_URL}/LOGO%20REDUCCION%20NEGATIVO.svg`,
        width: 1200,
        height: 630,
        alt: "Immersion Agency Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Immersion Agency",
    description: "Transformamos datos en estrategias para el crecimiento digital.",
    images: [
      `${GCS_BUCKET_URL}/LOGO%20REDUCCION%20NEGATIVO.svg`,
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// Componente principal del layout con manejo de locales
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <Script src="https://www.google.com/recaptcha/enterprise.js?render=6Le4jTksAAAAAE8sQqg3OH4rWp1iMuxTMGdhn9bu" strategy="beforeInteractive" />
      </head>
      <body>
        <Providers locale={locale} messages={messages}>
          <Navbar />
          <main className="minh-screen">
            {children}
            <GoogleTagManager gtmId="GTM-W2B58L9J" />
          </main>
          <ChatbotLoader />
        </Providers>
      </body>
    </html>
  );
}
