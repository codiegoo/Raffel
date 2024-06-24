import './inicio.sass'
import Carousel from "@/components/Carousel/Carousel";
import Nav from '@/components/Nav/Nav';



export default function Inicio() {


  return(
    <section id="InicioContain">
      <Nav/>
      <Carousel/> 
      <div className="textContain d-flex justify-content-center align-items-center">
        <h3>BMW M135iA xDrive + Mercedes Benz Clase C 2020 + Mercedes-AMG GT 2020</h3>
        <button className="btn btn-primary w-25">Info del sorteo 🎁</button>
      </div>
    </section>
  )
}