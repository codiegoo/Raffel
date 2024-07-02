import Boletos from "@/layouts/Boletos/Boletos";
import Contacto from "@/layouts/Contacto/Contacto";
import Inicio from "@/layouts/Inicio/Inicio";
import Preguntas from "@/layouts/Preguntas/Preguntas";
import './main.sass'

export default function Home() {
  return (
    <>
      <Inicio/>
      <Boletos/>
      <Contacto/>
      <Preguntas/>
    </>
  );
}
