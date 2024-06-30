import Link from "next/link";
import './carousel.sass';
import Image from "next/image";

export default function Carousel() {
  return (
    <div id="carouselExampleInterval" className="carousel slide mt-5" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="4000">
          <Image width={1920} height={1080} src="/images/auto.png" className="d-block w-100" style={{ height: 'auto', objectFit: 'contain' }} alt="First slide" />
        </div>
        <div className="carousel-item" data-bs-interval="4000">
          <Image width={1920} height={1080} src="/images/auto1.jpg" className="d-block w-100" style={{ height: 'auto', objectFit: 'contain' }} alt="Second slide" />
        </div>
        <div className="carousel-item" data-bs-interval="4000">
          <Image width={1920} height={1080} src="/images/auto2.jpg" className="d-block w-100" style={{ height: 'auto', objectFit: 'contain' }} alt="Third slide" />
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

      <div className="textContain p-3 d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle text-center bg-dark bg-opacity-75 rounded-3">
        <div>
          <img src="/images/logo.png" width={100} height={100} className="d-block mx-auto" alt="Logo" />
          <div className="text-center">
            <h1 className="text-white">Sorteos entre amigos</h1>
            <h2 className="text-white">Los mochis - Culiacan</h2>
            <Link href="#premiosContain" className="btnPremios">Info del sorteo 🎁</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
