'use client'

import { useEffect, useState } from 'react';
import boletosData from '@/data/boletos.json'



export default function Boletos() {

  const [boletos, setBoletos] = useState([]);
  const [boletosSeleccionados, setBoletosSeleccionados] = useState([]);

  useEffect(() => {
    setBoletos(boletosData.boletos);
  }, []);


   // Función para manejar la selección de boletos
  const handleSeleccionarBoleto = (numeroBoleto) => {
    // Verificar si el boleto ya está seleccionado
    if (boletosSeleccionados.includes(numeroBoleto)) {
      // Si ya está seleccionado, quitarlo de los boletos seleccionados
      const nuevosBoletosSeleccionados = boletosSeleccionados.filter((boleto) => boleto !== numeroBoleto);
      setBoletosSeleccionados(nuevosBoletosSeleccionados);
    } else {
      // Si no está seleccionado, añadirlo a los boletos seleccionados
      setBoletosSeleccionados([...boletosSeleccionados, numeroBoleto]);
    }
  };

  return(
    <section id="boletosContain">
      <div>
        <div class="container text-center">
          <h2>PROMOS</h2>
          <div class="row row-cols-2">
            <div class="col">Column</div>
            <div class="col">Column</div>
            <div class="col">Column</div>
            <div class="col">Column</div>
          </div>
        </div>

        <div>
          <h2>INFO</h2>

          <h5>CON TU BOLETO LIQUIDADO PARTICIPAS POR:</h5>
          <h5>PRESORTEOS:</h5>
          <h5>BONOS:</h5>
          <h5>SI COMPRAS 5 BOLETOS O MAS TE LLEVAS:</h5>
          <h5>SI COMPRAS 10 BOLETOS O MAS TE LLEVAS:</h5>
          <h5>SI COMPRAS 15 BOLETOS O MAS TE LLEVAS:</h5>
          <h5>NOTA:</h5>
          <h5>NOTA:</h5>
          <h5>NOTA:</h5>
        </div>

      </div>

      <div>
        <div class="input-group flex-nowrap" >
          <span class="input-group-text" id="addon-wrapping">🔎​</span>
          <input type="text" class="form-control-m" placeholder="Busca tu 🎟️ ..." aria-label="Username" aria-describedby="addon-wrapping"></input>
        </div>
        <button className="btn btn-primary w-25">Prueba tu suerte ⭐</button>


        
        <div className="container">
          <h4>{boletosSeleccionados.length} 🎟️ seleccionados!</h4>
          <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6">
            {/* Mostrar solo los boletos seleccionados */}
            {boletosSeleccionados.map((numeroBoleto, index) => (
              <div key={index} className="col mb-4">
                <div
                  className="card h-100" style={{ cursor: 'pointer' }}
                  onClick={() => handleSeleccionarBoleto(numeroBoleto)}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title">🎟️ {numeroBoleto}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary w-25">Apartar 🎉</button>
        </div>



        <div className="container mt-4">
          <h4>Boletos Disponibles</h4>
          <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6">
            {/* Iterar sobre los boletos y mostrar solo los disponibles */}
            {boletos.map((boleto) => (
              <div key={boleto.id} className="col mb-4">
                <div className="card h-100" style={{ cursor: 'pointer' }} onClick={() => boleto.disponible && handleSeleccionarBoleto(boleto.numero)}>
                  <div className="card-body text-center">
                    {/* Mostrar "Comprado ✅" si el boleto no está disponible */}
                    <h5 className="card-title">{boleto.disponible ? '🎟️' + boleto.numero : 'Comprado ✅'}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}