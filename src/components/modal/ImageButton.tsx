// src/components/modal/ImageButton.tsx
import React from 'react';
import Image from 'next/image';

interface ImageButtonProps {
  src: string;
  hoverSrc: string;
  index: number;
  openModal: () => void;
  isHovered: boolean; // Propiedad para determinar si está en hover
  setHoverIndex: React.Dispatch<React.SetStateAction<number | null>>; // Añadir setHoverIndex
}

const ImageButton: React.FC<ImageButtonProps> = ({
  src,
  hoverSrc,
  index,
  openModal,
  isHovered,
  setHoverIndex,
}) => {
  return (
    <button
      onClick={openModal}
      onMouseEnter={() => setHoverIndex(index)} // Establecer el índice en hover
      onMouseLeave={() => setHoverIndex(null)} // Resetear el índice al salir
      className="flex justify-center items-center text-black bg-indigo-950 hover:bg-indigo-950 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm p-4 transition-shadow duration-300 ease-in-out hover:shadow-[0px_4px_20px_rgba(0,204,221,0.6)] w-full max-w-xs h-auto aspect-square"
      aria-label={`Abrir modal para imagen ${index + 1}`} // Mejora en la accesibilidad
    >
      <Image
        src={isHovered ? hoverSrc : src}
        alt={`Imagen de ${index + 1}`} // Mejora en la accesibilidad
        width={200}
        height={200}
        className="transition-opacity duration-200 ease-in-out"
        style={{
          opacity: isHovered ? 1 : 0.7,
        }}
      />
    </button>
  );
};

export default ImageButton;