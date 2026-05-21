import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Clock3, FileSpreadsheet, Sparkles } from "lucide-react";
import "animate.css";

import { loginUser } from "../services/authService";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const user = loginUser(usuario, password);

    if (user) {
      alert(`Bienvenido, ${user.nombre}`);
      navigate("/dashboard");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-[#f5f7fb]">
      {/* PANEL IZQUIERDO */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#071426] text-white animate__animated animate__fadeInLeft">
        {/* Gradiente radial */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,255,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,255,170,0.08),_transparent_30%)]" />

        {/* Orbes decorativos */}
        <div className="absolute top-20 right-24 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl animate-pulse" />

        <div className="absolute bottom-32 left-16 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />

        <div className="absolute top-1/2 right-10 w-6 h-6 bg-cyan-400 rounded-full opacity-70 animate-bounce" />

        <div className="absolute top-24 left-24 w-4 h-4 bg-emerald-300 rounded-full opacity-80 animate-ping" />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          {/* Logo */}
          <div className="animate__animated animate__fadeInDown">
            <h1 className="text-3xl font-bold tracking-tight">
              Random
              <span className="text-cyan-400">Fates</span>
            </h1>
          </div>

          {/* Contenido principal */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="animate__animated animate__fadeInUp inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>

              <span className="text-xs tracking-[0.25em] text-cyan-300 font-semibold">
                BIENVENIDO
              </span>
            </div>

            {/* Hero */}
            <h2 className="animate__animated animate__fadeInUp text-5xl leading-tight font-bold mb-6">
              El azar,
              <br />
              <span className="text-cyan-400">a tu favor.</span>
            </h2>

            <p className="animate__animated animate__fadeInUp animate__delay-1s text-slate-300 text-lg leading-relaxed mb-12">
              Accede a tu cuenta y continúa creando experiencias memorables para
              tu comunidad.
            </p>

            {/* Features */}
            <div className="space-y-5">
              <FeatureItem
                icon={<ShieldCheck size={20} />}
                title="Sorteos verificables"
                description="Resultados transparentes y confiables para toda tu comunidad."
              />

              <FeatureItem
                icon={<Clock3 size={20} />}
                title="Tiempo real"
                description="Visualiza participantes y resultados al instante."
              />

              <FeatureItem
                icon={<FileSpreadsheet size={20} />}
                title="Importación CSV"
                description="Carga participantes masivamente de manera rápida."
              />
            </div>
          </div>

          {/* Círculos inferiores */}
          <div className="animate__animated animate__fadeInUp flex items-center gap-[-10px]">
            <div className="w-10 h-10 rounded-full bg-cyan-400 border border-white/10 transition duration-300 hover:scale-110" />

            <div className="w-10 h-10 rounded-full bg-emerald-300 -ml-3 border border-white/10 transition duration-300 hover:scale-110" />

            <div className="w-10 h-10 rounded-full bg-yellow-200 -ml-3 border border-white/10 transition duration-300 hover:scale-110" />

            <div className="w-10 h-10 rounded-full bg-cyan-200 -ml-3 border border-white/10 transition duration-300 hover:scale-110" />
          </div>
        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 animate__animated animate__fadeInRight">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 text-center animate__animated animate__fadeInDown">
            <h1 className="text-3xl font-bold text-slate-900">
              Random<span className="text-cyan-500">Fates</span>
            </h1>
          </div>

          {/* Card */}
          <div className="animate__animated animate__fadeInUp bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 p-8 transition duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            {/* Header */}
            <div className="mb-8">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-5 transition duration-300 hover:scale-110 hover:rotate-6">
                <Sparkles className="text-cyan-500 animate-pulse" size={28} />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Iniciar sesión
              </h2>

              <p className="text-slate-500">
                Ingresa tus credenciales para continuar.
              </p>
            </div>

            {/* Formulario */}
            <div className="space-y-5">
              <div className="animate__animated animate__fadeInUp">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Usuario
                </label>

                <input
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-300 focus:scale-[1.01]"
                />
              </div>

              <div className="animate__animated animate__fadeInUp animate__delay-1s">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contraseña
                </label>

                <input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-300 focus:scale-[1.01]"
                />
              </div>

              {/* Extras */}
              <div className="animate__animated animate__fadeInUp animate__delay-1s flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="rounded" />
                  Recordarme
                </label>

                <button className="text-cyan-600 hover:text-cyan-500 font-medium transition duration-300 hover:underline">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Botón Login */}
              <button
                onClick={handleLogin}
                className="animate__animated animate__fadeInUp animate__delay-2s w-full py-3 rounded-2xl bg-[#071426] hover:bg-[#0d1f38] text-white font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:scale-[1.02] hover:shadow-cyan-500/20"
              >
                Ingresar
              </button>

              <div className="animate__animated animate__fadeIn text-center text-sm text-slate-500 pt-4">
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-cyan-600 hover:text-cyan-500 font-semibold transition duration-300 hover:underline"
                >
                  Crear cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTE FEATURES */
function FeatureItem({ icon, title, description }) {
  return (
    <div className="group animate__animated animate__fadeInUp flex items-start gap-4 rounded-2xl border border-transparent p-2 transition duration-300 hover:border-white/10 hover:bg-white/[0.03]">
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-cyan-400 shrink-0 transition duration-300 group-hover:scale-110 group-hover:bg-cyan-400/10">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-white text-lg transition duration-300 group-hover:text-cyan-300">
          {title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default Login;
