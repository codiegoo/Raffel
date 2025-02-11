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
          <h2>PRECIOS</h2>
          <div className="promosCardsContain">
            <div className="promosItem">1 🎟️ x 💲50</div>
            <div className="promosItem">2 🎟️ x 💲100</div>
            <div className="promosItem">3 🎟️ x 💲150</div>
          </div>
        </div>
        <div className="infoSorteoContain">
          <h2>INFORMACION</h2>
          <p>Nuestros sorteos están basados en la loteria nacional 🍀. Anímate y sé uno de nuestros ganadores 🎖️. Todos nuestros sorteos se realizarán en vivo a través de Facebook. ✅​</p>
          <h3>NOTAS</h3>
          <p>✨ Los ganadores seran selecionados segun los ultimos 3 digitos de los boletos ganadores de la loteria. ✅​</p>
          <p>✨ Si eres ganador de un premio, aún participas por los demás. ✅​</p>
          <p>✨ La rifa se llevará a cabo una vez vendidos los boletos disponibles. ✅​</p>
          <p>✨ Paga tus boletos en el momento en que los apartas, ya que podrían ganártelos. ✅​</p>
        </div>
        <div className="bonoContain">
          <h3>BONO EXTRA</h3>
          <p>🥳 Si resultas gandor del primer lugar y mandas una captura al chat de que compartiste la publicacion del sorteo antes de la fecha indicada te llevas 💸 500 pesos extras! 🎉</p>
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
