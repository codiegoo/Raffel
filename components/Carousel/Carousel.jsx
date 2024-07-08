import Link from "next/link";
import './carousel.sass';
import Image from "next/image";

export default function Carousel() {
  return (
    <div id="carouselExampleInterval" className="carousel slide mt-5" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="4000">
          <Image priority={true} width={1920} height={1080} src="/images/auto.png" className="d-block w-100" style={{ width: "auto", height: 'auto', objectFit: 'contain' }} alt="First slide iphone 15 pro max 256gb sorteos jp" />
        </div>
        <div className="carousel-item" data-bs-interval="4000">
          <Image priority={true} width={1920} height={1080} src="/images/auto1.jpg" className="d-block w-100" style={{ width: "auto", height: 'auto', objectFit: 'contain' }} alt="Second slide iphone 15 pro max 256gb sorteos jp" />
        </div>
        <div className="carousel-item" data-bs-interval="4000">
          <Image priority={true} width={1920} height={1080} src="/images/auto2.jpg" className="d-block w-100" style={{ width: "auto", height: 'auto', objectFit: 'contain' }} alt="Third slide iphone 15 pro max 256gb sorteos jp" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

      <div className="textContain p-3 d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle text-center bg-dark bg-opacity-50 rounded-3">
        <div>
          <Image src="/images/logo.png" width={80} height={80} className="d-block mx-auto" alt="Logo de la pagina web de sorteos jp" />
          <div className="text-center">
            <h2 className="text-white">Sorteos entre amigos</h2>
            <h3 className="text-white">Los mochis - Culiacan</h3>
            <Link href="#premiosContain" className="btnPremios">Info del sorteo 🎁</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
