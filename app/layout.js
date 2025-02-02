import { Inter } from "next/font/google"
import 'bootstrap/dist/css/bootstrap.css'
import Boostrap from "@/components/Boostrap/Boostrap"
import Head from 'next/head'
import './main.sass'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sorteos JP ",
  description: "Pagina web de sorteos entre amigos los mochis culiacan",
  ogImage: '/images/logo.png',
  facebookDomainVerification: "zdm34a265j0uckz3hqiwinpxpj1oa9"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Etiqueta meta para Open Graph con ruta relativa */}
        <meta property="og:image" content={metadata.ogImage} />
        {/* Otras etiquetas meta que necesites */}
        <meta name="facebook-domain-verification" content={metadata.facebookDomainVerification} />
      </Head>
      <body className={inter.className}>
        {children}
        <Boostrap/>
      </body>
    </html>
  );  
}
