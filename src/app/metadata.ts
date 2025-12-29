import type { Metadata } from "next";

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
        url: "https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FLOGO%20REDUCCION%20NEGATIVO.svg?alt=media&token=383bd9fc-02d5-4084-8614-15c7ce35bdd2",
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
      "https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FLOGO%20REDUCCION%20NEGATIVO.svg?alt=media&token=383bd9fc-02d5-4084-8614-15c7ce35bdd2",
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};