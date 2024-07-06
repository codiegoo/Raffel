'use client'
import { useEffect, useState } from 'react';
import './admin.sass';
import Login from '@/components/Login/Login';
import Sorteo from '@/components/Sorteo/Sorteo';

export default function AdminPanelContent() {
  const [boletos, setBoletos] = useState([]);
  const [boletosSeleccionados, setBoletosSeleccionados] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  const handleBusquedaChange = (event) => {
    const valorBusqueda = event.target.value;
    setBusqueda(valorBusqueda);
  };

  const fetchBoletosFromServer = async () => {
    try {
      const response = await fetch('https://sorteos-jp.netlify.app/api/boletos');
      if (!response.ok) {
        throw new Error('Error al cargar los boletos');
      }
      const data = await response.json();
      const boletosActualizados = data.boletos.map(boleto => ({
        ...boleto,
        numero: boleto.disponible ? boleto.numero : 'Comprado'
      }));
      setBoletos(boletosActualizados);
    } catch (error) {
      console.error('Error en fetchBoletosFromServer:', error);
    }
  };

  const handleDesactivarBoletos = async () => {
    const formData = new FormData();
    boletosSeleccionados.forEach(numero => {
      formData.append('', numero);
    });

    try {
      const response = await fetch('https://sorteos-jp.netlify.app/api/boletos', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Error al desactivar boletos');
      }
      fetchBoletosFromServer();
      setBoletosSeleccionados([]);
      console.log('Boletos desactivados correctamente');
    } catch (error) {
      console.error('Error en handleDesactivarBoletos:', error);
      console.log('Hubo un error al desactivar boletos');
    }
  };

  useEffect(() => {
    fetchBoletosFromServer();
  }, []);

  const handleSeleccionarBoleto = (numeroBoleto) => {
    if (boletosSeleccionados.includes(numeroBoleto)) {
      const nuevosBoletosSeleccionados = boletosSeleccionados.filter(boleto => boleto !== numeroBoleto);
      setBoletosSeleccionados(nuevosBoletosSeleccionados);
    } else {
      const boletoEncontrado = boletos.find(boleto => boleto.numero === parseInt(numeroBoleto));
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

  return (
    <div className="adminPanelContain">
      <Login />
      <div className="boletosAdminContain">

        <div className="searchContain input-group flex-nowrap">
          <div className="searchInner">
            <input type="text" className="form-control-m" placeholder="Busca tu 🎟️ ..." aria-label="  Busca tu boleto" aria-describedby="addon-wrapping" value={busqueda} onChange={handleBusquedaChange}></input>
            <span className="input-group-text rounded-0" id="addon-wrapping">🔎</span>
          </div>

          {busqueda && (
            <div className="boletosCoinciden">
              <div className="row row-cols-4 row-cols-md-4 row-cols-lg-6 px-3 ">
                {boletos
                  .filter((boleto) =>
                    boleto.numero.toString().includes(busqueda) &&
                    boleto.disponible &&
                    !boletosSeleccionados.includes(boleto.numero)
                  )
                  .map((boleto) => (
                    <div
                      key={boleto.id}
                      className="col mb-2 px-1"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSeleccionarBoleto(boleto.numero)}
                    >
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <h5 className="card-title">🎟️ {boleto.numero}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>


        <div className="selectTicketsContain container">
          <h4>{boletosSeleccionados.length} 🎟️ seleccionados!</h4>
          <div className="row row-cols-4 row-cols-md-4 row-cols-lg-6">
            {/* Mostrar solo los boletos seleccionados */}
            {boletosSeleccionados.map((numeroBoleto, index) => (
              <div key={index} className="col mb-2 px-1">
                <div
                  className="card h-100"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSeleccionarBoleto(numeroBoleto)}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title">🎟️ {numeroBoleto}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btnDesactivarBoletos" onClick={handleDesactivarBoletos}>
            Desactivar
          </button>
        </div>
        <div className="boletosAdminInner container mt-4">
          <h4>Lista de boletos</h4>
          <div className="boletosListInner row row-cols-4 row-cols-md-4 row-cols-lg-6">
            {/* Iterar sobre los boletos y mostrar solo los disponibles */}
            {boletos.map((boleto) => (
              <div key={boleto.id} className="col mb-2 px-1">
                <div
                  className="card h-100"
                  style={{ cursor: 'pointer' }}
                  onClick={() => boleto.disponible && handleSeleccionarBoleto(boleto.numero)}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title">{boleto.disponible ? '🎟️ ' + boleto.numero : boleto.numero}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Sorteo />
    </div>
  );
}
