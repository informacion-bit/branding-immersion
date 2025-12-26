// src/components/NewsLatter.tsx
'use client';

import { db } from '../app/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Timestamp } from 'firebase/firestore'; // Importar Timestamp

export default function NewsLatter() {
    const t = useTranslations(); // Hook para traducción
    const [email, setEmail] = useState(''); // Estado para almacenar el email
    const [error, setError] = useState(''); // Estado para almacenar errores
    const [success, setSuccess] = useState(''); // Estado para almacenar mensaje de éxito

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        if (!email) {
            setError(t('newsletter.emailRequired')); // Mensaje de error si el email está vacío
            return;
        }

        try {
            // Guardar el email y la fecha en Firestore
            await addDoc(collection(db, 'subscribers'), {
                email,
                createdAt: Timestamp.fromDate(new Date()) // Guardar la fecha actual
            });
            setSuccess(t('newsletter.subscriptionSuccess')); // Mensaje de éxito
            setEmail(''); // Limpiar el campo de email
            setError(''); // Limpiar errores
        } catch (err) {
            setError(t('newsletter.subscriptionError')); // Mensaje de error en caso de fallo
            console.error('Error al agregar el documento: ', err);
        }
    };

    return (
        <div className="mt-8 flex flex-col items-center">
            <div className="relative flex flex-col w-full mx-auto mt-8 items-center min-h-[200px]">
                <div className="absolute inset-0">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FAdobeStock_89865661%20(1)%201.svg?alt=media&token=cba8517c-67a8-4391-9dba-14975fc62343"
                        alt="Imagen de fondo para el boletín de noticias"
                        fill
                        quality={70}
                        priority
                        className="object-cover"
                    />
                </div>

                <div className="relative z-10 max-w-2xl px-6 lg:max-w-7xl lg:px-8 p-4 bg-opacity-0 flex flex-col lg:flex-row">
                    <div className="flex flex-col items-start w-full lg:w-1/2 pr-16 mr-16">
                        <h3 className="text-2xl font-bold text-white">{t('newsletter.connect')}</h3>
                        <h3 className="text-lg text-white">{t('newsletter.description')}</h3>
                    </div>

                    <form className="flex flex-col w-full lg:w-1/2 mt-4 lg:mt-0" onSubmit={handleSubmit}>
                        <label htmlFor="email-address" className="text-white">
                            {t('newsletter.emailLabel')}
                        </label>
                        <div className="mt-2 flex flex-col sm:flex-row max-w-md gap-x-4 items-center">
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder={t('newsletter.emailPlaceholder')}
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                            <button
                                type="submit"
                                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-2 sm:mt-0 sm:ml-2"
                            >
                                {t('newsletter.subscribe')}
                            </button>
                        </div>
                        {error && <p className="text-red-500">{error}</p>} {/* Mostrar mensaje de error */}
                        {success && <p className="text-green-500">{success}</p>} {/* Mostrar mensaje de éxito */}
                    </form>
                </div>
            </div>
        </div>
    );
}