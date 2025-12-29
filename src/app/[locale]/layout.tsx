import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import { GoogleTagManager } from '@next/third-parties/google';
import ChatbotLoader from '@/components/ChatbotLoader';
import Script from 'next/script';

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
        url: "https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FLOGO%20REDUCCION%20NEGATIVO.svg?alt=media&token=383bd9fc-02d5-4084-8614-15c7ce35bdd2",
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
      "https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FLOGO%20REDUCCION%20NEGATIVO.svg?alt=media&token=383bd9fc-02d5-4084-8614-15c7ce35bdd2",
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
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2Fuxui-modal.webp?alt=media&token=8e3c5074-e130-4f0f-b7b9-5fdf017b4fd6" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2Fprogramacion-modal.webp?alt=media&token=17f61474-fea2-4aac-9470-bded43cfa669" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2Fmarketing-modal.webp?alt=media&token=a91b4bc7-ab97-49aa-bede-87480e8c8dc7" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2Fproduccion-modal.webp?alt=media&token=39128a85-5b4f-4d03-9117-9610e6201856" as="image" />
        <Script src="https://www.google.com/recaptcha/enterprise.js?render=6Le4jTksAAAAAE8sQqg3OH4rWp1iMuxTMGdhn9bu" strategy="beforeInteractive" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="min-h-screen">
            {children}
            <GoogleTagManager gtmId="GTM-W2B58L9J" />
          </main>
          <ChatbotLoader />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
