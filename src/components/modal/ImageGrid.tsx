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

// Datos de imÃ¡genes y contenido del modal
const images = [
  'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FFrame%206%20(2).svg?alt=media&token=9a2b756d-942d-4ed3-97f2-94387433b464',
  'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FFrame%206%20(1).svg?alt=media&token=4898c433-8fad-4e1d-ae88-69ce73a21dd6',
  'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FFrame%207.svg?alt=media&token=b97b97b0-81ea-4786-b1b3-4646540eaf2a',
  'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FFrame%206.svg?alt=media&token=b3923b23-9174-4cd2-92ce-7f345d04a2b6',
];

const imageHover = [
  'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FUx-ui.svg?alt=media&token=4347576b-fe8e-483f-9695-1c4129af6223',
  'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FMarketing%20(2).svg?alt=media&token=35ef4c26-25c4-4160-9097-3f217e6996fc',
  'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FProgramacion.svg?alt=media&token=8eabbf0e-f3f7-41e2-90bc-500f9508e07c',
  'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2FFrame%206%20(3).svg?alt=media&token=d6eb155b-266e-4f7c-a8cf-71779c5a2a28',
];

const modalContent: ModalContent[] = [
  {
    title: 'titulo1',
    content: 'contenido1',
    backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2Fuxui-modal.webp?alt=media&token=8e3c5074-e130-4f0f-b7b9-5fdf017b4fd6',
    type: 'tipo1',
  },
  {
    title: 'titulo2',
    content: 'contenido2',
    backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2Fprogramacion-modal.webp?alt=media&token=17f61474-fea2-4aac-9470-bded43cfa669',
    type: 'tipo2',
  },
  {
    title: 'titulo3',
    content: 'contenido3',
    backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2Fmarketing-modal.webp?alt=media&token=a91b4bc7-ab97-49aa-bede-87480e8c8dc7',
    type: 'tipo3',
  },
  {
    title: 'titulo4',
    content: 'contenido4',
    backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/immersion-3a085.appspot.com/o/imagenesImmersion%2Fproduccion-modal.webp?alt=media&token=39128a85-5b4f-4d03-9117-9610e6201856',
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