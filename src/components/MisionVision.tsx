// src/components/MisionVision.tsx

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function MisionVision() {
    const t = useTranslations("mision");

    return (
        <div className="mt-8">
            {/* Contenedor principal que ocupa el 70% del ancho en pantallas grandes y 100% en pantallas pequeñas, comenzando desde el borde derecho */}
            <div className="relative flex flex-col w-full sm:w-[80vw] ml-auto mt-8 items-center bg-indigo-900 bg-opacity-30 backdrop-blur-lg p-4">
                <div className="relative z-10 max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="font-semibold text-slate-50 text-4xl text-center mb-4">{t("missionVision")}</h2>

                    <div className="flex flex-col md:flex-row text-slate-200">
                        {/* Imagen colocada al lado de la lista */}
                        <div className="flex flex-col items-center md:w-1/3">
                            <Image
                                src={'https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FVector%20(1).svg?alt=media&token=d005312c-b542-488c-874b-3d2e22d1d16d'}
                                width={300}
                                height={300}
                                alt="Imagen de Misión y Visión"
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