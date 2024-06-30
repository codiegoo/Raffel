'use client'
import { useState } from "react";
import "./login.sass";

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Estado para controlar si el usuario ha iniciado sesión

  const handleSubmit = (event) => {
    event.preventDefault();
    // Verificar credenciales
    if (userName === 'sorteosjp' && userNumber === '1234') {
      setLoggedIn(true); // Marcar como logueado si las credenciales son correctas
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className={`formContain ${loggedIn ? 'logged-in' : ''}`} onSubmit={handleSubmit}>
      <form>
        <div className="inputContain">
          <label htmlFor="userName">Usuario</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Nombre de usuario"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="inputContain">
          <label htmlFor="userNumber">Clave</label>
          <input
            type="password"
            id="userNumber"
            name="userNumber"
            placeholder="Clave de usuario"
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
