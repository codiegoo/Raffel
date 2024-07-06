import React, { useState, useRef } from 'react';
import Image from 'next/image';
import './luckyMachine.sass';
import Form from '@/components/Form/Form';
import confetti from 'canvas-confetti';
import boletosData from '@/data/boletos.json'; // Ajusta la ruta según donde esté tu archivo JSON
import Link from 'next/link';

export default function LuckyMachine({setShowLuckyMachine}) {
  const [generatedTickets, setGeneratedTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault(event);
  };

  const handleChange = (event) => {
    event.target.value;
  };

  const handleClickForm = (event) => {
    event.preventDefault();
    setShowForm(true)
  }

  const handleImageClick = () => {
    const selectValue = document.getElementById('ticketCount').value;
    generateTickets(parseInt(selectValue));
    fireConfetti();
  };

  const handleClose = () => {
    setShowLuckyMachine(false);
  };

  const generateTickets = (count) => {
    const availableTickets = boletosData.boletos.filter(boleto => boleto.disponible);
    const numTicketsToGenerate = Math.min(count, availableTickets.length);

    const tickets = [];
    const selectedTickets = new Set();

    while (tickets.length < numTicketsToGenerate) {
      const randomIndex = Math.floor(Math.random() * availableTickets.length);
      const ticketNumber = availableTickets[randomIndex].numero;
      if (!selectedTickets.has(ticketNumber)) {
        tickets.push(ticketNumber);
        selectedTickets.add(ticketNumber);
      }
    }

    setGeneratedTickets(tickets);
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
    <div className="luckyMachineContain">
      <form className='luckyContain' onSubmit={handleSubmit} displayName="formLuckyNumbers">
        <h2>🎰 MAQUINITA DE LA SUERTE 🎰</h2>
        <select id="ticketCount" className="menuStripContain form-select" aria-label="Default select example" onChange={handleChange} name="ticketCount">
          <option defaultValue>🎉 Elige la cantidad de boletos a generar ☘️</option>
          <option value="1">🎰 generar 1 boleto 🎟️</option>
          <option value="3">🎰 generar 3 boletos 🎟️</option>
          <option value="5">🎰 generar 5 boletos 🎟️</option>
          <option value="10">🎰 generar 10 boletos 🎟️</option>
        </select>
        <div className="imageContainer canvas-confetti-btn animate__animated confettiBtn" onClick={handleImageClick}>
          <Image src="/images/maquinita.jpg" width={600} height={450} />
          <p>Click aquí para <br /> generar tus boletos!</p>
        </div>

        <div className="boletosGeneratedContain">
          <h6>Tus boletos:</h6>
          <div className="boletosGrid mb-2 row row-cols-4 row-cols-md-4 row-cols-lg-5">
            {generatedTickets.map((numeroBoleto, index) => (
              <div key={index} className="col mb-2 px-1">
                <div className="card h-100 bg-dark">
                  <div className="card-body text-center">
                    <h5 className="card-title text-white">🎟️ {numeroBoleto}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
      <Link href="" className="btnApartarTickets" onClick={handleClickForm}>🎉 Apartar 🎉</Link>
      {showForm && <Form boletosSeleccionados={generatedTickets} setShowForm={setShowForm}/>}
      <button type="button" className="btnCloseLuckyMachine" onClick={handleClose}>x</button>
    </div>
  );
}