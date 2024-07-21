import { Inter } from "next/font/google"
import 'bootstrap/dist/css/bootstrap.css'
import Boostrap from "@/components/Boostrap/Boostrap"
import Head from 'next/head'
import './main.sass'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sorteos JP ",
  description: "Pagina web de sorteos entre amigos los mochis culiacan",
  ogImage: '/images/logo.png'
};

export default function RootLayout({ children }) {
  return (

    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Etiqueta meta para Open Graph con ruta relativa */}
        <meta property="og:image" content={metadata.ogImage} />
        {/* Otras etiquetas meta que necesites */}
      </Head>

      <html lang="es">
        <body className={inter.className}>
          {children}
          <Boostrap/>
        </body>
      </html>
    </>
  );  
}
