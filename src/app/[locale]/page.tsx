'use client';
import Image from 'next/image';
import Script from 'next/script';

// Direct imports instead of dynamic
import Carousel from '@/components/Carousel';
import NuestroEquipo from '@/components/NuestroEquipo';
import ImageGrid from '@/components/modal/ImageGrid';
import ComoTrabajamos from '@/components/ComoTrabajamos';
import PorqueImmersion from '@/components/PorqueImmersion';
import MisionVision from '@/components/MisionVision';
import VideoPublicitario from '@/components/VideoPublicitario';
import Formulario from '@/components/Formulario';
import NewsLatter from '@/components/NewsLatter';
import Footer from '@/components/Footer';
import { JSX } from 'react';

// Define interfaces
interface DecorativeImageProps {
  src: string;
  alt: string;
  className: string;
  transform?: string;
  [key: string]: unknown; // Use unknown for additional props
}

// Constants with type definitions
const GTAG_ID: string = 'G-NXXTEYLQ3N';
const IMAGES: Record<string, string> = {
  astronaut: "https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FAdobeStock_532826579.svg?alt=media&token=2f3b1cc9-4c9d-44db-b3c1-010c33ce15a6",
  leftDecor: "https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FEllipse%203.svg?alt=media&token=3f210f81-8ca3-472c-ba22-b3e73c3ac5fb",
  additionalDecor: "https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FEllipse%202%20(2).svg?alt=media&token=267d096a-8e96-48ec-b01a-0e2bbf4759d6",
  rightDecor: "https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FEllipse%201.svg?alt=media&token=cf1506fa-e0ca-4923-8829-9dee3add13e4"
};

// Reusable image component with types
const DecorativeImage: React.FC<DecorativeImageProps> = ({ src, alt, className, transform, ...props }) => (
  <div className={`absolute z-10 hidden sm:block w-full max-w-[900px] ${className}`}>
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      loading="lazy"
      className={`object-contain pointer-events-none w-[200%] ${transform || ''}`}
      {...(props as Record<string, string>)} // Use explicit casting if necessary
    />
  </div>
);

export default function HomePage(): JSX.Element {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/* Google Tag Manager */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-tag-manager" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GTAG_ID}', { 'anonymize_ip': true });
        `}
      </Script>

      {/* Background astronaut */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-full h-full sm:w-[1300px] sm:h-[1300px]">
        <Image
          src={IMAGES.astronaut}
          alt="Fondo decorativo astronauta"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
          className="opacity-20 pointer-events-none"
        />
      </div>

      {/* Decorative images */}
      <DecorativeImage
        src={IMAGES.leftDecor}
        alt="Fondo decorativo izquierdo"
        className="top-1/4 left-0 transform -translate-y-1/4"
        transform="translate-x-[-50%]"
      />
      <Carousel />

      {/* Main content */}
      <main className="relative z-10 flex-grow">
        <NuestroEquipo />
        <ImageGrid />

        <section id="conocenos" className="mt-8 pt-8">
          <ComoTrabajamos />
        </section>

        <PorqueImmersion />

        <DecorativeImage
          src={IMAGES.additionalDecor}
          alt="Fondo decorativo adicional"
          className="top-[67%] left-0 transform -translate-y-1/4"
          transform="translate-x-[-50%]"
        />

        <DecorativeImage
          src={IMAGES.rightDecor}
          alt="Fondo decorativo derecho"
          className="top-[55%] right-0 transform -translate-y-1/4"
          transform="translate-x-[50%]"
        />

        <MisionVision />
        <VideoPublicitario />

        <section id="formulario" className="mt-8 pt-10">
          <Formulario />
        </section>

        <NewsLatter />
        <Footer />
      </main>
    </div>
  );
}
