// src/components/LanguageSwitcher.tsx

"use client";

import { usePathname, useRouter } from 'next/navigation'; // Usa los hooks nativos de Next.js
import { routing } from '@/i18n/routing';
import { useEffect, useState } from 'react'; // Asegúrate de importar useState y useEffect

const LanguageSwitcher = () => {
    const pathname = usePathname(); // Obtiene la ruta actual
    const router = useRouter(); // Para redireccionar al nuevo idioma
    const [selectedLocale, setSelectedLocale] = useState<| "en" | "es">(routing.defaultLocale); // Estado para el idioma seleccionado

    // Efecto para actualizar el idioma seleccionado basado en la URL
    useEffect(() => {
        const [, locale] = pathname.split('/'); // Obtiene el idioma de la URL

        // Asegurarse de que el locale sea válido antes de actualizar el estado
        if (routing.locales.includes(locale as | "en" | "es")) {
            setSelectedLocale(locale as | "en" | "es"); // Actualiza el estado
        }
    }, [pathname]); // Se ejecuta cada vez que cambie la ruta

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value as | "en" | "es"; // Asegura que newLocale sea uno de los tipos válidos

        // Extraer la ruta actual sin el prefijo del idioma
        const [, , ...rest] = pathname.split('/');

        // Redirigir a la nueva URL con el idioma seleccionado
        router.push(`/${newLocale}/${rest.join('/')}`);
    };

    // Estilos del componente
    return (
        <div className="relative">
            <select
                onChange={handleLanguageChange}
                value={selectedLocale}
                className="bg-gray-700 text-white py-2 px-3 pr-10 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-950 focus:bg-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:focus:bg-gray-900 transition duration-200 ease-in-out"
            >
                {routing.locales.map((locale) => (
                    <option key={locale} value={locale}>
                        {locale.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSwitcher;