'use client';
import Image from 'next/image';
import Script from 'next/script';
import dynamic from 'next/dynamic'; // Import dynamic

// Components that are safe for direct import
import Carousel from '@/components/Carousel';
import NuestroEquipo from '@/components/NuestroEquipo';
import ImageGrid from '@/components/modal/ImageGrid';
import ComoTrabajamos from '@/components/ComoTrabajamos';
import PorqueImmersion from '@/components/PorqueImmersion';
import MisionVision from '@/components/MisionVision';
import VideoPublicitario from '@/components/VideoPublicitario';
import NewsLatter from '@/components/NewsLatter';
import Footer from '@/components/Footer';
import { JSX } from 'react';

// Dynamically import the Formulario component with SSR turned off
const Formulario = dynamic(() => import('@/components/Formulario'), {
  ssr: false,
  loading: () => <p>Loading form...</p>,
});

const GCS_BUCKET_URL = "https://storage.googleapis.com/immersion-005-7e407.appspot.com/imagenesImmersion";

// Define interfaces
interface DecorativeImageProps {
  src: string;
  alt: string;
  className: string;
  transform?: string;
  [key: string]: unknown;
}

// Constants with type definitions
const GTAG_ID: string = 'G-NXXTEYLQ3N';
const IMAGES: Record<string, string> = {
  astronaut: `${GCS_BUCKET_URL}/AdobeStock_532826579.svg`,
  leftDecor: `${GCS_BUCKET_URL}/Ellipse%203.svg`,
  additionalDecor: `${GCS_BUCKET_URL}/Ellipse%202%20(2).svg`,
  rightDecor: `${GCS_BUCKET_URL}/Ellipse%201.svg`
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
      {...(props as Record<string, string>)}
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
