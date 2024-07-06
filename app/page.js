import Boletos from "@/layouts/Boletos/Boletos";
import Contacto from "@/layouts/Contacto/Contacto";
import Inicio from "@/layouts/Inicio/Inicio";
import Pagos from "@/layouts/Pagos/Pagos";
import './main.sass'
import Footer from "@/layouts/Footer/Footer";

export default function Home() {
  return (
    <>
      <Inicio/>
      <Boletos/>
      <Pagos/>
      <Contacto/>
      <Footer/>
    </>
  );
}
