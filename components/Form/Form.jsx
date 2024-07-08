import './form.sass';

export default function Form({ boletosSeleccionados, setShowForm}) {



  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Obtener los datos del formulario
    const nombreCompleto = formData.get('userName');
    const numeroWhatsApp = formData.get('userNumber');

    enviarMensajeWhatsApp(nombreCompleto, numeroWhatsApp, boletosSeleccionados);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  // Función para enviar mensaje a WhatsApp
  const enviarMensajeWhatsApp = (nombre, numeroWhatsApp, boletos) => {
    const mensaje = `Hola, soy ${nombre}. Quiero apartar los siguientes boletos: ${boletos.join(', ')}. Al siguiente numero: ${numeroWhatsApp}`; // Mensaje a enviar

    const numeroDestino = '6871403223'; // Número de WhatsApp al que enviar el mensaje

    // Crear el enlace para abrir WhatsApp con el mensaje y el número de destino
    const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`;

    // Abrir WhatsApp en una nueva pestaña del navegador
    window.open(url, '_blank');
  };


  return (
    <div className="formBackground">
      <form className="formContain" onSubmit={handleSubmit}>
        <div className="inputContain">
          <label htmlFor="userName">Nombre completo:</label>
          <input type="text" id="userName" name="userName" placeholder="nombre(s), primer apellido, segundo apellido" />
        </div>

        <div className="inputContain">
          <label htmlFor="userNumber">Whatsapp:</label>
          <input type="number" id="userNumber" name="userNumber" placeholder="Ejemplo: 6871020304" />
        </div>

        <div className="boletosClienteContain">
          <h6>Tus boletos:</h6>
          <div className="boletosListGrid mb-2 row row-cols-4 row-cols-md-4 row-cols-lg-4">
            {/* Mostrar los boletos seleccionados */}
            {boletosSeleccionados.map((numeroBoleto) => (
              <div key={numeroBoleto} className="col mb-2 px-1">
                <div className="card h-100 bg-dark">
                  <div className="card-body text-center">
                    <h5 className="card-title text-white">🎟️ {numeroBoleto}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button type="submit" className="btnApartarForm">🎉 Apartar 🎉</button>
        <button type="button" className="btnCloseForm" onClick={handleClose}>x</button>
      </form>
    </div>
  );
}
