'use client';
// src/components/ComoTrabajamos.tsx

import Image from "next/image";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { useTranslations } from "next-intl";

const GCS_BUCKET_URL = "https://storage.googleapis.com/immersion-005-7e407.appspot.com/imagenesImmersion";

export default function ComoTrabajamos() {
    const t = useTranslations("common");

    const items = [
        {
            src: `${GCS_BUCKET_URL}/Pen-Tool--Streamline-Flex.svg`,
            title: t("designImplement"),
            items: [
                t("basedOnData"),
                t("identifyAreas"),
            ],
        },
        {
            src: `${GCS_BUCKET_URL}/definition-search-book.svg`,
            title: t("analyze"),
            items: [
                t("analyzeData"),
                t("interpretData"),
            ],
        },
        {
            src: `${GCS_BUCKET_URL}/Sun--Streamline-Flex.svg`,
            title: t("optimize"),
            items: [
                t("identifyImprovementAreas"),
                t("refineStrategies"),
            ],
        },
        {
            src: `${GCS_BUCKET_URL}/rotate-left.svg`,
            title: t("createCycles"),
            items: [
                t("createContinuousCycles"),
                t("adaptToMarketChanges"),
            ],
        },
    ];
    return (
        <section className="mt-12 flex flex-col items-center">
            <h2 className="font-semibold text-slate-50 text-4xl text-center">{t("howWeWork")}</h2>
            <div className="relative flex flex-col w-full mx-auto mt-8 items-center">
                {/* Remover el fondo blanco y permitir ver la imagen del astronauta */}
                <div className="absolute inset-0 z-0" />

                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 p-4 bg-white bg-opacity-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {items.map((item, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <Image
                                    src={item.src}
                                    width={60}
                                    height={60}
                                    alt={`Imagen ${index + 1}`}
                                    className="mb-4 object-contain"
                                    style={{ height: 'auto' }}
                                />
                                <h3 className="font-semibold text-slate-200">{item.title}</h3>
                                <ul className="text-start text-slate-200 mt-4">
                                    {item.items.map((li, liIndex) => (
                                        <li key={liIndex} className="flex items-start mt-2 min-h-[10px]">
                                            <CheckBadgeIcon className="mr-2 text-white w-3 h-3 flex-shrink-0" />
                                            <span className="flex-grow">{li}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}