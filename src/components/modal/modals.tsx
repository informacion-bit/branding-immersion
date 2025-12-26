// src/components/modal/modals.tsx
import React from 'react';
import Image from 'next/image';

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    modalType: string; // Considera usar este tipo en el futuro para estilos específicos
    title: string;
    content: string;
    backgroundImage: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    closeModal,
    title,
    content,
    backgroundImage,
}) => {
    if (!isOpen) return null;

    // Dividimos el contenido en párrafos, usando "." como delimitador
    const contentParagraphs = content.split('.').filter(Boolean);

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative p-4 w-full max-w-full sm:max-w-2xl md:max-w-4xl mx-auto sm:my-8 overflow-y-auto sm:overflow-hidden h-full sm:h-auto mt-16"> {/* Ajustar margen superior */}
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={80}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg" />
      </div>

      {/* Contenido principal */}
      <div className="relative flex flex-col h-full max-h-[90vh] md:max-h-[80vh] md:w-[55rem] z-50"> {/* Asegúrate de que el z-index sea adecuado */}
        {/* Cabecera del modal */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={closeModal}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            aria-label="Close modal"
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="relative p-4 md:p-5 space-y-4 overflow-y-auto flex-1 w-full max-w-full md:max-w-[45rem] max-h-[35rem] md:max-h-[50vh] text-left z-10">
          {contentParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-relaxed text-white dark:text-slate-100"
            >
              {paragraph.trim()}.
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

export default Modal;