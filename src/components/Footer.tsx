// src/components/Footer.tsx

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations('footer'); // Define the scope for translations

    // Reusable Social Icon Component
    const SocialIcon = ({
        href,
        src,
        alt,
    }: {
        href: string;
        src: string;
        alt: string;
    }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 mx-2 bg-gray-100 rounded-full dark:bg-gray-700"
        >
            <Image
                src={src}
                alt={alt}
                width={30}
                height={30}
                className="object-contain"
            />
        </a>
    );

    return (
        <footer className="w-full shadow dark:bg-black m-0">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    {/* Logo */}
                    <a
                        href="https://immersion.com.ar/"
                        className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                    >
                        <Image
                            alt="Immersion logo"
                            src="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FGroup%20(1).svg?alt=media&token=f5cb6700-36a5-4511-90b4-c7f6d34096de"
                            width={200}
                            height={200}
                            priority
                        />
                    </a>

                    {/* Social Media Icons */}
                    <div className="flex">
                        <SocialIcon
                            href="https://www.instagram.com/immersion.md/?igsh=MTl2eHZiYm5zYnNucA%3D%3D"
                            src="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2Fsocial.png?alt=media&token=6ec1387b-c12d-463f-abd7-45290911109a"
                            alt="Instagram icon"
                        />
                        <SocialIcon
                            href="https://www.linkedin.com/company/immersion-digital-marketing/about/?viewAsMember=true"
                            src="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2Flinkedin.png?alt=media&token=0afa73b7-663f-464d-bd44-3ce479c28f7c"
                            alt="LinkedIn icon"
                        />
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

                {/* Footer Text */}
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2024 <a href="https://immersion.com.ar/" className="hover:underline">Immersion™</a>. {t('allRightsReserved')}
                </span>
            </div>
        </footer>
    );
}