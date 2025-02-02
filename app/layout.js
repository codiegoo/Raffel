import { Inter } from "next/font/google"
import 'bootstrap/dist/css/bootstrap.css'
import Boostrap from "@/components/Boostrap/Boostrap"
import './main.sass'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sorteos JP",
  description: "Pagina web de sorteos entre amigos los mochis culiacan",
  openGraph: {
    title: "Sorteos JP",
    description: "Pagina web de sorteos entre amigos los mochis culiacan",
    images: ['/images/logo.png'], // Usa URL absoluta si hay problemas
    type: "website",
  },
  other: {
    "facebook-domain-verification": "zdm34a265j0uckz3hqiwinpxpj1oa9"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Boostrap/>
      </body>
    </html>
  );  
}
