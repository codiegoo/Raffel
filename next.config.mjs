import { config as dotenvConfig } from 'dotenv';

// Cargar variables de entorno de un archivo .env
dotenvConfig('./.env');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configura tus variables de entorno
  env: {
    API_URL: process.env.API_URL,
  },
  
};

export default nextConfig;
