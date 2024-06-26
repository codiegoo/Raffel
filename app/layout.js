import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css'
import Boostrap from "@/components/Boostrap/Boostrap";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sorteos JP ",
  description: "Pagina web de sorteos entre amigos los mochis culiacan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Boostrap/>
      </body>
    </html>
  );  
}
