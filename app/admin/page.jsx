'use client'
import { useEffect, useState } from 'react';
import './admin.sass'
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
  
  // Función para manejar la selección de boletos
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
  


  const fetchBoletos = async () => {
    try {
      const response = await fetch('/api/boletos');
      if (!response.ok) {
        throw new Error('Error al cargar los boletos');
      }
  
      const data = await response.json();
  
      // Verifica que data[0].boletos exista antes de mapear
      const boletosActualizados = data.boletos[0].boletos.map(boleto => ({
        ...boleto,
        numero: boleto.disponible ? boleto.numero : '❌'
      }));
  
      setBoletos(boletosActualizados); // Establece los boletos actualizados en el estado
    } catch (error) {
      console.error('Error en fetchBoletos:', error);
    }
  };
  
  
  const handleDesactivarBoletos = async () => {
    try {
      const formData = new FormData();
      boletosSeleccionados.forEach(numero => {
        formData.append('boletosSeleccionados', numero);
      });
  
      const response = await fetch('/api/boletos', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Error al desactivar boletos');
      }
  
      // Después de desactivar exitosamente, volvemos a cargar los boletos actualizados
      await fetchBoletos();
      setBoletosSeleccionados([]); // Limpiamos los boletos seleccionados después de desactivar
      console.log('Boletos desactivados correctamente');
    } catch (error) {
      console.error('Error en handleDesactivarBoletos:', error);
      console.log('Hubo un error al desactivar boletos');
    }
  };
  
  


  useEffect(() => {
    fetchBoletos();
  }, []); // El arreglo vacío indica que se ejecuta solo al montar el componente

  

  return (
    <div className="adminPanelContain">
      <Login/>
      <div className="boletosAdminContain">
        <div className="searchContain input-group flex-nowrap">
          <div className="searchInner">
            <input type="text" className="form-control-m" placeholder="Busca tu 🎟️ ..." aria-label="  Busca tu boleto" aria-describedby="addon-wrapping" value={busqueda} onChange={handleBusquedaChange}></input>
            <span className="input-group-text rounded-0" id="addon-wrapping">🔎</span>
          </div>
          
          {/* Contenedor para mostrar el boleto encontrado */}
          {busqueda && (
            <div className="boletosCoinciden">
              <div className="row row-cols-4 row-cols-md-4 row-cols-lg-6 px-3 ">
                {boletos
                  .filter((boleto) => 
                    boleto.numero.toString().includes(busqueda) && // Búsqueda exacta
                    boleto.disponible && // Solo boletos disponibles
                    !boletosSeleccionados.includes(boleto.numero) // No mostrar los seleccionados
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

      <Sorteo/>
    </div>
  );
}
