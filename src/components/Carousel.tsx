'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const GCS_BUCKET_URL = "https://storage.googleapis.com/immersion-005-7e407.appspot.com/imagenesImmersion";

const images = [
  {
    desktop: `${GCS_BUCKET_URL}/Image-01-carousel%20(1).webp`,
    mobile: `${GCS_BUCKET_URL}/carousel1Mini.webp`,
    alt: 'Image 1',
    textKey: 'image1.text',
    text1Key: 'image1.text1',
    buttonTextKey: 'image1.buttonText',
  },
  {
    desktop: `${GCS_BUCKET_URL}/Image-002-carousel.webp`,
    mobile: `${GCS_BUCKET_URL}/carosuel2.webp`,
    alt: 'Image 2',
    textKey: 'image2.text',
    text1Key: 'image2.text1',
    buttonTextKey: 'image2.buttonText',
  },
  {
    desktop: `${GCS_BUCKET_URL}/Image-03-carousel.webp`,
    mobile: `${GCS_BUCKET_URL}/carosuel3.webp`,
    alt: 'Image 3',
    textKey: 'image3.text',
    text1Key: 'image3.text1',
    buttonTextKey: 'image3.buttonText',
  },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const t = useTranslations('carousel');

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    let interval: NodeJS.Timeout | null = null;

    if (!isHovering) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering, hasMounted]);

  const currentImage = useMemo(() => images[currentIndex], [currentIndex]);

  if (!hasMounted) {
    return null;
  }

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

export default Carousel;