'use client'
  import Image from 'next/image';
  import Link from 'next/link';
  import { useEffect, useState } from 'react';
  import './nav.sass'

  export default function Nav() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      // Función para actualizar el estado basado en el ancho de la ventana
      const updateMedia = () => {
        setIsSmallScreen(window.innerWidth <= 992);
      };
  
      // Ejecutar la función al cargar el componente
      updateMedia();
  
      // Agregar un listener para escuchar los cambios de tamaño de la ventana
      window.addEventListener('resize', updateMedia);
  
      // Remover el listener cuando el componente se desmonte
      return () => {
        window.removeEventListener('resize', updateMedia);
      };
    }, []);

    return (
      <nav className="navbar bg-dark fixed-top">
        <div className="navbarInner container-fluid d-flex justify-content-between align-items-center">
          <div className="logoContain d-flex flex-row align-items-center">
            <Image className="logoInner" alt="logo de la pagina web sorteos jp" src="/images/logo.png" width={50} height={50}/>
            <div className="logoTextContain">
              <h2 className="m-0 fw-bold text-white">Sorteos JP</h2>
            </div>
          </div>
          {isSmallScreen ? (
            <button className="navbar-toggler bg-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          ) : (
            <div className="navbar-nav order-lg-2">
              <ul className="navbar-nav flex-row">
                <li className="nav-item mx-4">
                  <Link href="#InicioContain" className="nav-link text-white fw-bold fs-5">Inicio</Link> 
                </li>
                <li className="nav-item mx-4">
                  <Link href="#boletosContain" className="nav-link text-white fw-bold fs-5">Boletos</Link> 
                </li>
                <li className="nav-item mx-4">
                  <Link href="#contactoContain" className="nav-link text-white fw-bold fs-5">Pagos</Link> 
                </li>
                <li className="nav-item mx-4">
                  <Link href="#contactoContain" className="nav-link text-white fw-bold fs-5">Contacto</Link> 
                </li>
              </ul>
            </div>
          )}
          <div className="navBurgerContain offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Sorteos JP</h5>
              <button type="button" className="btn-close btn-close-white w-5 btn-lg" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className={isSmallScreen ? "navbar-nav flex-column" : "navbar-nav justify-content-end flex-grow-1 pe-3"}>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#InicioContain">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#boletosContain">Boletos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#PagosContain">Pagos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#ContactoContain">Contacto</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
