import './premios.sass';

export default function Premios() {
  return (
    <div className="premiosContainer">
      <div className="animationText">
        <span>💯¡3 lugares!🥳​  🥇¡animate y llevate ese Iphone!📱</span>
        <span>⚠️¡Mucha mas probabilidad de ganar!🎟️ ⭐​¡bonos extras!💸</span>
      </div>
      <div id="premiosContain" className="txtPremiosContain d-flex flex-row justify-content-between align-items-center">
        <div className="txtPremio"><h3 className="mx-5 my-5">1🥇 Iphone 15 Pro Max 256gb 📱 + 5,000 pesos 💸​</h3></div>
        <div className="txtPremio"><h3 className="mx-5 my-5">2🥈 5,000 pesos 💸</h3></div>
        <div className="txtPremio"><h3 className="mx-5 my-5">3🥉 2,500 pesos 💸</h3></div>
      </div>
      <div className="animationText">
        <span>⚠️¡solo 800 boletos!🎟️ ⭐​¡bonos extras!💸</span>
        <span>🥇¡animate y llevate ese Iphone!📱 ⚠️¡Mucha mas probabilidad de ganar!🎟️</span>
      </div>
    </div>
  );
}
