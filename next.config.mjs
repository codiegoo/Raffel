/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://sorteos-jp.vercel.app'], // Dominio para el que se optimizarán las imágenes
    loader: 'default',
    path: '/_next/image',
    remotePatterns: [
      {
        protocol: 'https',           // Protocolo de la URL remota
        hostname: 'sorteos-jp.vercel.app',  // Nombre del host (dominio) de la URL remota
        port: '',                    // Puerto (opcional, deja vacío si no es relevante)
        pathname: '/icon.png',       // Ruta específica o patrón de ruta que deseas optimizar
      }
    ]
  }
};

export default nextConfig;
