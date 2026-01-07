// src/components/MisionVision.tsx

import Image from "next/image";
import { useTranslations } from "next-intl";

const GCS_BUCKET_URL = "https://storage.googleapis.com/immersion-005-7e407.appspot.com/imagenesImmersion";

export default function MisionVision() {
    const t = useTranslations("mision");

    return (
        <div className="mt-8">
            {/* Contenedor principal que ocupa el 70% del ancho en pantallas grandes y 100% en pantallas pequeÃ±as, comenzando desde el borde derecho */}
            <div className="relative flex flex-col w-full sm:w-[80vw] ml-auto mt-8 items-center bg-indigo-900 bg-opacity-30 backdrop-blur-lg p-4">
                <div className="relative z-10 max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="font-semibold text-slate-50 text-4xl text-center mb-4">{t("missionVision")}</h2>

                    <div className="flex flex-col md:flex-row text-slate-200">
                        {/* Imagen colocada al lado de la lista */}
                        <div className="flex flex-col items-center md:w-1/3">
                            <Image
                                src={`${GCS_BUCKET_URL}/Vector%20(1).svg`}
                                width={300}
                                height={300}
                                alt="Imagen de MisiÃ³n y VisiÃ³n"
                            />
                        </div>

                        {/* Lista de elementos */}
                        <ul className="md:w-2/3 mt-4 md:mt-0 md:ml-4">
                            <li>{t("missionText")}</li>
                            <li className="mt-8">{t("visionText")}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}