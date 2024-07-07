import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

// Cargar variables de entorno de un archivo .env
dotenvConfig({ path: join(__dirname, '.env') });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configura tus variables de entorno
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
