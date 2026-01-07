// src/components/modal/ImageGrid.tsx
'use client';

import React, { useState } from 'react';
import ImageButton from './ImageButton';
import Modal from './modals';
import { useTranslations } from 'next-intl';

// Definir los tipos para una mejor tipificaciÃ³n
interface ModalContent {
  title: string;
  content: string;
  backgroundImage: string;
  type: string;
}

const GCS_BUCKET_URL = "https://storage.googleapis.com/immersion-005-7e407.appspot.com/imagenesImmersion";

// Datos de imÃ¡genes y contenido del modal
const images = [
  `${GCS_BUCKET_URL}/Frame%206%20(2).svg`,
  `${GCS_BUCKET_URL}/Frame%206%20(1).svg`,
  `${GCS_BUCKET_URL}/Frame%207.svg`,
  `${GCS_BUCKET_URL}/Frame%206.svg`,
];

const imageHover = [
  `${GCS_BUCKET_URL}/Ux-ui.svg`,
  `${GCS_BUCKET_URL}/Marketing%20(2).svg`,
  `${GCS_BUCKET_URL}/Programacion.svg`,
  `${GCS_BUCKET_URL}/Frame%206%20(3).svg`,
];

const modalContent: ModalContent[] = [
  {
    title: 'titulo1',
    content: 'contenido1',
    backgroundImage: `${GCS_BUCKET_URL}/uxui-modal.webp`,
    type: 'tipo1',
  },
  {
    title: 'titulo2',
    content: 'contenido2',
    backgroundImage: `${GCS_BUCKET_URL}/programacion-modal.webp`,
    type: 'tipo2',
  },
  {
    title: 'titulo3',
    content: 'contenido3',
    backgroundImage: `${GCS_BUCKET_URL}/marketing-modal.webp`,
    type: 'tipo3',
  },
  {
    title: 'titulo4',
    content: 'contenido4',
    backgroundImage: `${GCS_BUCKET_URL}/produccion-modal.webp`,
    type: 'tipo4',
  },
];

const ImageGrid: React.FC = () => {
  const t = useTranslations('ImageGrid');
  const [modalData, setModalData] = useState<{ index: number; isOpen: boolean } | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setModalData({ index, isOpen: true });
  };

  const closeModal = () => {
    setModalData(null);
  };

return (
  <div className="flex justify-center items-center  mx-auto px-6 mt-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 lg:gap-6">
        {images.map((src, index) => (
          <ImageButton
            key={index}
            src={src}
            hoverSrc={imageHover[index]}
            index={index}
            openModal={() => openModal(index)}
            setHoverIndex={setHoverIndex}
            isHovered={hoverIndex === index}
          />
        ))}
    </div>

    {modalData && (
      <Modal
        isOpen={modalData.isOpen}
        closeModal={closeModal}
        title={t(modalContent[modalData.index].title)}
        content={t(modalContent[modalData.index].content)}
        backgroundImage={modalContent[modalData.index].backgroundImage}
        modalType={modalContent[modalData.index].type}
      />
    )}
  </div>
);
};

export default ImageGrid;
