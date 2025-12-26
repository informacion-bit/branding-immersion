import createMiddleware from 'next-intl/middleware';

// Configuración del middleware de internacionalización
export default createMiddleware({
  locales: ['en', 'es'], // Idiomas soportados
  defaultLocale: 'es',   // Idioma por defecto
});

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)', // Excluye rutas internas de Next.js y archivos estáticos
  ],
};