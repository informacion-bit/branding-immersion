import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Define el tipo permitido de locales
type Locale = 'en' | 'es';

export default getRequestConfig(async ({ locale }) => {
  // Si el `locale` no es válido, define uno por defecto y retorna un 404 si es necesario
  const defaultLocale: Locale = 'en'; // Cambia a tu idioma predeterminado si es necesario
  const resolvedLocale: Locale = routing.locales.includes(locale as Locale) 
    ? (locale as Locale) 
    : defaultLocale;

  // Cargar los mensajes asociados al idioma
  try {
    const messages = (await import(`../../messages/${resolvedLocale}.json`)).default;

    return {
      locale: resolvedLocale,
      messages,
    };
  } catch (error) {
    console.error(`Error loading messages for locale "${resolvedLocale}":`, error);
    notFound(); // Manejo de errores en caso de que no se encuentren los mensajes
  }
});