import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handeLogin = () => {
    if (usuario === "user" && password === "123456") {
      alert("Login correcto");

      navigate("/dashboard");
    } else {
      alert("Verificar credenciales");
    }
  };

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl/10 font-bold mb-4">Login</h2>

      <input
        type="text"
        placeholder="Ingresa el usuario"
        className="border p-2 m-2"
        onChange={(e) => setUsuario(e.target.value)}
      ></input>

      <input
        type="password"
        placeholder="Ingresa la contraseña"
        className="border p-2 m-2"
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <button
        onClick={handeLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl"
      >
        Ingresar
      </button>
    </div>
  );
}

export default Login;
