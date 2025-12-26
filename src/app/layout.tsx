import type { Metadata } from "next";
import "../globals.css"; // Mantén el CSS global
import { NextIntlClientProvider } from 'next-intl'; // Proveedor de internacionalización
import { getMessages } from 'next-intl/server'; // Obtención de mensajes
import Navbar from '@/components/Navbar'; // Componente Navbar
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/next';
import { GoogleTagManager } from '@next/third-parties/google'



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
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // Resuelve la promesa y extrae el locale

  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error(`Error fetching messages for locale '${locale}':`, error);
    messages = await getMessages({ locale: "es" }); // Carga mensajes predeterminados
  }

  return (
    <html lang={locale}>
      <head>
        {/* Preload para recursos críticos */}
        <link
          rel="preload"
          href="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FLOGO%20REDUCCION%20NEGATIVO.svg?alt=media&token=383bd9fc-02d5-4084-8614-15c7ce35bdd2"
          as="image"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">
            {children}
             <Analytics />
                   <GoogleTagManager gtmId="GTM-W2B58L9J" />


          </main>
          <footer className="bg-gray-900 text-white text-center py-4">
            <p>&copy; {new Date().getFullYear()} Immersion Agency. All rights reserved.</p>
          </footer>
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
