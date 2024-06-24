'use client'

import { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [boletos, setBoletos] = useState([]);
  const [boletosSeleccionados, setBoletosSeleccionados] = useState([]);

  
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


  // Función para cargar boletos desde el servidor
  const fetchBoletos = () => {
    fetch('http://localhost:3000/api/boletos')
      .then(response => {
        if (response.ok) {
          return response.json(); // Aquí se espera recibir una respuesta JSON válida
        }
        throw new Error('Error al cargar los boletos');
      })
      .then(data => {
        // Mapea los boletos para cambiar el número por el texto cuando no está disponible
        const boletosActualizados = data.boletos.map(boleto => ({
          ...boleto,
          numero: boleto.disponible ? boleto.numero : 'Comprado ✅'
        }));
        setBoletos(boletosActualizados); // Establece los boletos actualizados en el estado
      })
      .catch(error => {
        console.error('Error en fetchBoletos:', error);
      });
  };

  useEffect(() => {
    fetchBoletos();
  }, []); // El arreglo vacío indica que se ejecuta solo al montar el componente


  const handleDesactivarBoletos = () => {
    const formData = new FormData();
  
    // Agregar cada número de boleto seleccionado al FormData
    boletosSeleccionados.forEach(numero => {
      formData.append('',numero);
    });

    console.log({message: "formulario de datos", formData})

    fetch('http://localhost:3000/api/boletos', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          fetchBoletos();
          setBoletosSeleccionados([]);
          console.log('Boletos desactivados correctamente');
        } else {
          throw new Error('Error al desactivar boletos');
        }
      })
      .catch(error => {
        console.error('Error en handleDesactivarBoletos:', error);
        console.log('Hubo un error al desactivar boletos');
      });
  };
  

  return (
    <>
      <div className="container">
        <h4>{boletosSeleccionados.length} 🎟️ seleccionados!</h4>
        <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6">
          {/* Mostrar solo los boletos seleccionados */}
          {boletosSeleccionados.map((numeroBoleto, index) => (
            <div key={index} className="col mb-4">
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
        <button className="btn btn-primary w-25" onClick={handleDesactivarBoletos}>
          Desactivar
        </button>
      </div>
      <div className="container mt-4">
        <h4>Lista de boletos</h4>
        <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6">
          {/* Iterar sobre los boletos y mostrar solo los disponibles */}
          {boletos.map((boleto) => (
            <div key={boleto.id} className="col mb-4">
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
    </>
  );
}
