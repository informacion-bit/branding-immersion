import createNextIntlPlugin from 'next-intl/plugin';

// Crear el plugin de internacionalización
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de imágenes
  images: {
    dangerouslyAllowSVG: true, // Habilitar SVG
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**', // Permitir todas las rutas en el dominio
      },
    ],
  },
  compress: true, // Habilitar la compresión de los recursos

  // Configuración de headers
  async headers() {
    return [
      {
        source: '/(.*)', // Aplicar los siguientes headers a todas las rutas
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Habilitar caching de largo plazo
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
        ],
      },
    ];
  },
};

// Exportar la configuración combinada con el plugin de internacionalización
export default withNextIntl(nextConfig);