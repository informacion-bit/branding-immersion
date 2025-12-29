'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const images = [
  {
    desktop: 'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FImage-01-carousel%20(1).webp?alt=media&token=7abdd4ae-1a96-409b-9c8f-45fdf2d5f7c1',
    mobile: 'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2Fcarousel1Mini.webp?alt=media&token=35781c85-e94d-4df7-8af2-789fedd02025',
    alt: 'Image 1',
    textKey: 'image1.text',
    text1Key: 'image1.text1',
    buttonTextKey: 'image1.buttonText',
  },
  {
    desktop: 'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FImage-002-carousel.webp?alt=media&token=36de1d24-a5ae-4a80-9f40-e7df98860de2',
    mobile: 'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2Fcarosuel2.webp?alt=media&token=3956873b-7795-4c59-80ab-d5d470c8fc31',
    alt: 'Image 2',
    textKey: 'image2.text',
    text1Key: 'image2.text1',
    buttonTextKey: 'image2.buttonText',
  },
  {
    desktop: 'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FImage-03-carousel.webp?alt=media&token=5f2469fe-19aa-4eec-8c6d-c87135c89953',
    mobile: 'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2Fcarosuel3.webp?alt=media&token=d90acb84-4392-4287-9ef7-865206dbd323',
    alt: 'Image 3',
    textKey: 'image3.text',
    text1Key: 'image3.text1',
    buttonTextKey: 'image3.buttonText',
  },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const t = useTranslations('carousel');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!isHovering) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering]);

  const currentImage = useMemo(() => images[currentIndex], [currentIndex]);

  return (
    <div
      id="controls-carousel"
      className="relative w-full h-screen md:h-[80vh]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Imagen actual */}
      <div className="relative h-full overflow-hidden rounded-lg">
        <Image
          key={`desktop-${currentIndex}`}
          src={currentImage.desktop}
          alt={currentImage.alt}
          className="hidden md:block object-cover"
          fill
          sizes="100vw"
          priority={currentIndex === 0}
          loading={currentIndex === 0 ? 'eager' : 'lazy'}
        />
        <Image
          key={`mobile-${currentIndex}`}
          src={currentImage.mobile}
          alt={currentImage.alt}
          className="md:hidden object-cover"
          fill
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center lg:justify-start lg:pl-24 p-4">
          <div className="text-white text-center lg:text-left lg:w-1/2">
            <p className="text-2xl leading-tight">{t(currentImage.textKey)}</p>
            <p className="mt-4 text-sm">{t(currentImage.text1Key)}</p>
            <a href="#formulario" className="mt-4 inline-block px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
              {t(currentImage.buttonTextKey)}
            </a>
          </div>
        </div>
      </div>

      {/* Botones de navegaciÃ³n */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-30 p-3 rounded-full hover:bg-opacity-50 transition-opacity z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-30 p-3 rounded-full hover:bg-opacity-50 transition-opacity z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

export default React.memo(Carousel);