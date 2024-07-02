import React, { useState } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import boletosData from '@/data/boletos.json';
import './sorteo.sass'

const Sorteo = React.forwardRef((props, ref) => {
  const [generatedTicket, setGeneratedTicket] = useState(null); // Cambiado a un solo boleto ganador en estado
  

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleImageClick = () => {
    generateWinner();
    fireConfetti();
  };

  const generateWinner = () => {
    const availableTickets = boletosData.boletos.filter(boleto => !boleto.disponible); // Filtrar los boletos no disponibles

    if (availableTickets.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableTickets.length);
      const ticketNumber = availableTickets[randomIndex].numero;
      setGeneratedTicket(ticketNumber);
    } else {
      setGeneratedTicket(null); // Manejo de caso donde no hay boletos disponibles
    }
  };

  const fireConfetti = () => {
    var count = 200;
    var defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      const confettiSettings = Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      });

      confetti(confettiSettings);
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <form ref={ref} className="luckyContain" onSubmit={handleSubmit} displayName="formLuckyNumbers">
      <h2>🎰 RULETITA DE LA SUERTE 🎰</h2>
      <div className="imageContainer canvas-confetti-btn animate__animated confettiBtn" onClick={handleImageClick}>
        <Image src="/images/maquinita.jpg" width={600} height={450} />
        <p>🤩 Click aquí para generar un boleto ganador! 🥳</p>
      </div>

      <div className="boletosGeneratedContain">
        <h6>🥳 El boleto ganador es: 🤩</h6>
        {generatedTicket ? (
          <div className="boletosGrid mb-2 row row-cols-2 row-cols-md-4 row-cols-lg-5">
            <div className="col mb-2 px-1">
              <div className="card h-100 bg-dark">
                <div className="card-body text-center">
                  <h5 className="card-title text-white">🎟️ {generatedTicket}</h5>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </form>
  );
});

Sorteo.displayName = 'Sorteo';

export default Sorteo;
