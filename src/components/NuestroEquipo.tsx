// src/components/NuestroEquipo.tsx

'use client'; // Indica que este componente se ejecuta en el cliente

import { useTranslations } from "next-intl";

export default function NuestroEquipo() {
    const t = useTranslations('NuestroEquipo'); // Mueve la llamada al hook aquí

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center font-semibold text-slate-50 text-3xl md:text-4xl mt-4">
                {t('titulo')} {/* Título traducido */}
            </h2>
            <p className="mx-auto mt-8 text-center tracking-tight text-slate-50 text-base md:text-lg">
                {t('descripcion')} {/* Descripción traducida */}
            </p>
        </div>
    );
}