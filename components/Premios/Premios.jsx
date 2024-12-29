import './premios.sass';

export default function Premios() {
  return (
    <div className="premiosContainer">
      <div className="animationText">
        <span>💯¡3 lugares!🥳 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🥇¡Anímate y llevate los premios!💸 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ⚠️¡Mucha mas probabilidad de ganar!🎟️ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ⭐¡bonos extras!💸</span>
      </div>
      <div id="premiosContain" className="txtPremiosContain d-flex flex-row justify-content-between align-items-center">
        <div className="txtPremio"><h3 className="mx-5 my-5">1🥇 10,000 pesos 💸​</h3></div>
        <div className="txtPremio"><h3 className="mx-5 my-5">2🥈 2,000 pesos 💸</h3></div>
        <div className="txtPremio"><h3 className="mx-5 my-5">3🥉 1,000 pesos 💸</h3></div>
      </div>
      <div className="animationText">
        <span>⚠️¡solo 600 boletos!🎟️ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ⭐¡bonos extras!💸 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  🥇¡Anímate y llevatelos premios!💸 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ⚠️¡Mucha mas probabilidad de ganar!🎟️</span>
      </div>
    </div>
  );
}
