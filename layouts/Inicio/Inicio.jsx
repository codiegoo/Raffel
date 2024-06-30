import './inicio.sass'
import Carousel from "@/components/Carousel/Carousel";
import Nav from '@/components/Nav/Nav';
import Premios from '@/components/Premios/Premios';



export default function Inicio() {


  return(
    <section id="InicioContain">
      <Nav/>
      <Carousel/> 
      <Premios/>
    </section>
  )
}