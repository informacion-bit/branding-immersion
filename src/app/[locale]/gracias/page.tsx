'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Gratitude() {
  const t = useTranslations('gratitude');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br  p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">{t('thankYou')}</h1>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          {t('description')}
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
}