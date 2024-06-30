import './premios.sass';

export default function Premios() {
  return (
    <div className="premiosContainer">
      <div className="animationText">
        <span>💯¡3 lugares!🥳​</span>
        <span>⭐​¡bonos extras!💸</span>
        <span>💯¡3 lugares!🥳​</span>
        <span>⭐​¡bonos extras!💸</span>
      </div>
      <div id="premiosContain" className="txtPremiosContain d-flex flex-row justify-content-center align-items-center">
        <div className="txtPremio"><h3 className="mx-5 my-5">1️🥇 Iphone 15 Pro Max 256gb 📱​</h3></div>
        <div className="txtPremio"><h3 className="mx-5 my-5">2️🥈 5,000 pesos 💸</h3></div>
        <div className="txtPremio"><h3 className="mx-5 my-5">3️🥉 2,500 pesos 💸</h3></div>
      </div>
      <div className="animationText">
        <span>⚠️¡solo 1000 boletos!🎟️</span>
        <span>🥇¡animate y llevate ese Iphone!📱 </span>
        <span> ⚠️¡solo 1000 boletos!🎟️</span>
        <span>🥇¡animate y llevate ese Iphone!📱</span>
      </div>
    </div>
  );
}
