'use client'

import './boletos.sass';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LuckyMachine from '@/components/LuckyMachine/LuckyMachine';
import Form from '@/components/Form/Form';

export default function Boletos() {
  const [boletos, setBoletos] = useState([]);
  const [boletosSeleccionados, setBoletosSeleccionados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showLuckyMachine, setShowLuckyMachine] = useState(false);

  const handleBusquedaChange = (event) => {
    const valorBusqueda = event.target.value;
    setBusqueda(valorBusqueda);
  };

  const handleSeleccionarBoleto = (numeroBoleto) => {
    if (boletosSeleccionados.includes(numeroBoleto)) {
      const nuevosBoletosSeleccionados = boletosSeleccionados.filter(
        (boleto) => boleto !== numeroBoleto
      );
      setBoletosSeleccionados(nuevosBoletosSeleccionados);
    } else {
      const boletoEncontrado = boletos.find(
        (boleto) => boleto.numero === parseInt(numeroBoleto)
      );

      if (boletoEncontrado) {
        if (!boletoEncontrado.disponible) {
          alert('El boleto ya ha sido vendido.');
        } else {
          setBoletosSeleccionados([...boletosSeleccionados, numeroBoleto]);
        }
      } else {
        alert('Boleto no encontrado.');
      }
    }
  };

  const fetchBoletos = async () => {
    try {
      const response = await fetch('/api/boletos');
      if (!response.ok) {
        throw new Error('Error al cargar los boletos');
      }

      const data = await response.json();
      
      const boletosActualizados = data.boletos[0].boletos

      setBoletos(boletosActualizados);
    } catch (error) {
      console.error('Error en fetchBoletos:', error);
    }
  };

  const handleClickForm = (event) => {
    event.preventDefault();
    setShowForm(true);
  };

  const handleClickLuckyMachine = (event) => {
    event.preventDefault();
    setShowLuckyMachine(true);
  };

  useEffect(() => {
    fetchBoletos();
  }, []);

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
        <div className="bonoContain">
          <h3>BONO EXTRA</h3>
          <p>🥳 Si resultas gandor del primer lugar y compartiste la publicacion del sorteo antes de la fecha indicada te llevas 💸 5,000 pesos extras! 🎉</p>
        </div>
      </div>

      <div id="boletosContain" className="searchSelectContain">
        <h2>BOLETOS </h2>
        <div className="searchContain flex-nowrap">
          <div className="searchInner">
            <input type="text" className="form-control-m" placeholder="Busca tu 🎟️ ..." aria-label="  Busca tu boleto" aria-describedby="addon-wrapping" value={busqueda} onChange={handleBusquedaChange}></input>
            <span className="input-group-text rounded-0" id="addon-wrapping">🔎</span>
          </div>
          
          {busqueda && (
            <div className="boletosCoinciden">
              <div className="coincidenListContain row row-cols-4 row-cols-md-4 row-cols-lg-6 px-3">
                {boletos
                  .filter((boleto) => 
                    boleto.numero.toString().includes(busqueda) &&
                    boleto.disponible &&
                    !boletosSeleccionados.includes(boleto.numero)
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
          {showLuckyMachine && <LuckyMachine boletos={boletos} setShowLuckyMachine={setShowLuckyMachine} showForm={showForm} setShowForm={setShowForm} />}
        </div>

        <div className="selectTicketsContain container">
          <h4>{boletosSeleccionados.length} 🎟️ seleccionados!</h4>
          <div className="selectTicketsList mb-4 row row-cols-4 row-cols-md-4 row-cols-lg-6">
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

          <Link href="#" onClick={handleClickForm} className="btnApartar">🎉  Apartar 🎉</Link>
          {showForm && <Form boletosSeleccionados={boletosSeleccionados} setShowForm={setShowForm} />}
        </div>

        <div className="ticketListContain container mt-4">
          <h4>LISTA DE BOLETOS</h4>
          <div className="ticketsList row row-cols-4 row-cols-md-5 row-cols-lg-6">
            {boletos.map((boleto) => (
              <div key={boleto.id} className="col mb-2 px-1">
                <div
                  className="card h-100"
                  style={{ cursor: 'pointer' }}
                  onClick={() => boleto.disponible && handleSeleccionarBoleto(boleto.numero)}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title">{boleto.disponible ? '🎟️ ' + boleto.numero : '❌'}</h5>
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
