  'use client'

  import './boletos.sass'
  import { useEffect, useState, useRef } from 'react';
  import Link from 'next/link';
  import boletosData from '@/data/boletos.json'
  import LuckyMachine from '@/components/LuckyMachine/LuckyMachine';
  import Form from '@/components/Form/Form';

  export default function Boletos() {
    const [boletos, setBoletos] = useState([]);
    const [boletosSeleccionados, setBoletosSeleccionados] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showLuckyMachine, setShowLuckyMachine] = useState(false)


    useEffect(() => {
      setBoletos(boletosData.boletos);
    }, []);

    const handleClickForm = (event) => {
      event.preventDefault();
      setShowForm(true)
    }

    const handleClickLuckyMachine = (event) => {
      event.preventDefault();
      setShowLuckyMachine(true)
    }

    const handleBusquedaChange = (event) => {
      const valorBusqueda = event.target.value;
      setBusqueda(valorBusqueda);
    };  

    const handleSeleccionarBoleto = (numeroBoleto) => {
      // Verificar si el boleto ya está seleccionado  
      if (boletosSeleccionados.includes(numeroBoleto)) {
        // Si ya está seleccionado, quitarlo de los boletos seleccionados
        const nuevosBoletosSeleccionados = boletosSeleccionados.filter(
          (boleto) => boleto !== numeroBoleto
        );
        setBoletosSeleccionados(nuevosBoletosSeleccionados);
      } else {
        // Buscar el boleto por número
        const boletoEncontrado = boletos.find(
          (boleto) => boleto.numero === parseInt(numeroBoleto)
        );

        if (boletoEncontrado) {
          // Verificar disponibilidad
          if (!boletoEncontrado.disponible) {
            alert('El boleto ya ha sido vendido.');
          } else {
            // Si está disponible, añadirlo a los boletos seleccionados
            setBoletosSeleccionados([...boletosSeleccionados, numeroBoleto]);
          }
        } else {
          alert('Boleto no encontrado.');
        }
      }
    };


  
    

    return (
      <section className="boletosContain">
        <div className="infoTxtContain">
          <div className="promosContain text-center">
            <h2>PROMOS</h2>
            <div className="promosCardsContain">
              <div className="promosItem">💲190💲 1 🎟️</div>
              <div className="promosItem">💲180💲 si nos sigues en fb</div>
              <div className="promosItem">💲170💲 si compras 3 o mas 🎟️</div>
            </div>
          </div>
          <div className="infoSorteoContain">
            <h2>INFORMACION</h2>
            <p>Nuestros sorteos son basados en ruletita de la suerte 🍀 anímate y se uno de nuestros ganadores 🎖️, todo nuestros sorteos se realizarán en vivo a través de Facebook.✅​</p>
            <h3>NOTAS</h3>
            <p>✨ Si eres ganador de un premio aun participas por los demas. ✅​</p>
            <p>✨ La rifa se llevara acabo una vez vendidos los boletos disponibles. ✅​</p>
            <p>✨ Paga tus boletos en el momento que los apartas ya que puede que te lo ganen. ✅​</p>
            <p>✨ Si eliges un numero de boletos que no aplique en ninguna promo los boletos se cobraran por unidad. ✅​</p>
            <p>✨ Si quieres comprar mas de 5 boletos y recibir una promocion contactanos antes de apartar tus boletos. ✅​</p>
          </div> 
        </div>

        <div id="boletosContain" className="searchSelectContain">
          <h2>BOLETOS </h2>
          <div className="searchContain flex-nowrap">
            <div className="searchInner">
              <input type="text" className="form-control-m" placeholder="Busca tu 🎟️ ..." aria-label="  Busca tu boleto" aria-describedby="addon-wrapping" value={busqueda} onChange={handleBusquedaChange}></input>
              <span className="input-group-text rounded-0" id="addon-wrapping">🔎</span>
            </div>
            
            {/* Contenedor para mostrar el boleto encontrado */}
            {busqueda && (
              <div className="boletosCoinciden">
                <div className="coincidenListContain row row-cols-4 row-cols-md-4 row-cols-lg-6 px-3 ">
                  {boletos
                    .filter((boleto) => 
                      boleto.numero.toString().includes(busqueda) && // Búsqueda exacta
                      boleto.disponible && // Solo boletos disponibles
                      !boletosSeleccionados.includes(boleto.numero) // No mostrar los seleccionados
                    )
                    .map((boleto) => (
                      <div
                        key={boleto.id}
                        className="boletoCoincideItem col mb-2 px-1"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSeleccionarBoleto(boleto.numero)}
                      >
                        <div className="boletoCardContain card h-100">
                          <div className="boletoCardInner card-body text-center">
                            <h5 className="card-title">🎟️ {boleto.numero}</h5>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            <Link href="#" onClick={handleClickLuckyMachine} className="btnLuckyMachine">⭐ Prueba tu suerte 🎰​</Link>
            {showLuckyMachine && <LuckyMachine setShowLuckyMachine={setShowLuckyMachine} showForm={showForm} setShowForm={setShowForm} />}
          </div>
            
          <div className="selectTicketsContain container">
              <h4>{boletosSeleccionados.length} 🎟️ seleccionados!</h4>
              <div className="selectTicketsList mb-4 row row-cols-4 row-cols-md-4 row-cols-lg-6">
                {/* Mostrar solo los boletos seleccionados */}
                {boletosSeleccionados.map((numeroBoleto, index) => (
                  <div key={index} className="listTicketsContain col mb-2 px-1">
                    <div
                      className="listTicketsInner card h-100 bg-dark"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSeleccionarBoleto(numeroBoleto)}
                    >
                      <div className="listTicketsCard card-body text-center">
                        <h5 className="card-title text-white">🎟️ {numeroBoleto}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="" onClick={handleClickForm} className="btnApartar">🎉  Apartar 🎉</Link>
              {showForm && <Form boletosSeleccionados={boletosSeleccionados} setShowForm={setShowForm} />}
          </div>

          <div className="ticketListContain container mt-4">
              <h4>LISTA DE BOLETOS</h4>
              <div className="ticketsList row row-cols-4 row-cols-md-5 row-cols-lg-6">
                {/* Iterar sobre los boletos y mostrar solo los disponibles */}
                {boletos.map((boleto) => (
                  <div key={boleto.id} className="col mb-2 px-1">
                    <div
                      className="card h-100"
                      style={{ cursor: 'pointer' }}
                      onClick={() => boleto.disponible && handleSeleccionarBoleto(boleto.numero)}
                    >
                      <div className="card-body text-center">
                        <h5 className="card-title">{boleto.disponible ? '🎟️ ' + boleto.numero : 'Comprado'}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </section>
    );
  }
