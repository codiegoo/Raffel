import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import './sorteo.sass';

const Sorteo = React.forwardRef((boletos, ref) => {
  const [generatedTicket, setGeneratedTicket] = useState(null); // Boleto ganador final
  const [displayNumber, setDisplayNumber] = useState(null); // Número mostrado en el boleto durante la animación
  const [isAnimating, setIsAnimating] = useState(false); // Controla si la animación está en curso

  useEffect(() => {
    if (isAnimating) {
      const duration = 10; // Duración de la animación en segundos
      const totalSteps = 11; // Número total de pasos (del 10 al 0)
      const stepDuration = (duration * 1000) / (totalSteps - 1); // Intervalo de tiempo entre cada actualización

      let currentStep = 10; // Comienza desde 10

      const interval = setInterval(() => {
        setDisplayNumber(currentStep);
        currentStep -= 1;
        
        if (currentStep < 0) {
          clearInterval(interval);
          setDisplayNumber(generatedTicket); // Mostrar el número del boleto ganador final
          setIsAnimating(false);
          fireConfetti(); // Activar el confeti después de mostrar el boleto ganador
        }
      }, stepDuration); // Actualiza el número cada `stepDuration` milisegundos
    }
  }, [isAnimating, generatedTicket]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleImageClick = () => {
    generateWinner();
  };

  const generateWinner = () => {
    const availableTickets = boletos.boletos.filter(boleto => !boleto.disponible);

    if (availableTickets.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableTickets.length);
      const ticketNumber = availableTickets[randomIndex].id;
      setGeneratedTicket(ticketNumber);
      setDisplayNumber(null); // Limpiar el número mostrado antes de iniciar la animación
      setIsAnimating(true);
    } else {
      setGeneratedTicket(null);
      setDisplayNumber(null);
      setIsAnimating(false);
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
    <form ref={ref} className="luckyContain" onSubmit={handleSubmit}>
      <h2>🎰 RULETITA DE LA SUERTE 🎰</h2>
      <div className="imageContainer canvas-confetti-btn animate__animated confettiBtn" onClick={handleImageClick}>
        <Image src="/images/maquinita.jpg" width={600} height={450} alt="Imagen de maquinita de la suerte de sorteos jp" priority={true} />
        <p>🤩 Click aquí para generar un boleto ganador! 🥳</p>
      </div>

      <div className="boletosGeneratedContain">
        <h6>🥳 El boleto ganador es: 🤩</h6>
        <div className="boletosGrid mb-2 row row-cols-2 row-cols-md-4 row-cols-lg-5">
          <div className="col mb-2 px-1">
            <div className="card h-100 bg-dark">
              <div className="card-body text-center">
                <h5 className="card-title text-white">
                  🎟️ {displayNumber !== null ? displayNumber : '...' }
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
});

Sorteo.displayName = 'Sorteo';

export default Sorteo;
