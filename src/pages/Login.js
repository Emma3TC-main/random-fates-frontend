import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Clock3, FileSpreadsheet, ShieldCheck, Sparkles } from "lucide-react";
import "animate.css";

import { loginUser } from "../services/authService";
import { demoSeed } from "../services/demoSeedService";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(demoSeed.email);
  const [password, setPassword] = useState(demoSeed.password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event?.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Ingresa correo y contraseña.");
      return;
    }

    try {
      setLoading(true);
      const result = await loginUser(email.trim(), password);

      // If backend requires OTP, save challenge token temporarily and redirect
      if (result?.requiresOtp) {
        sessionStorage.setItem("auth_challenge_token", result.challengeToken);
        sessionStorage.setItem("auth_pending_email", email.trim());
        if (result.expiresInSeconds) sessionStorage.setItem("auth_otp_expires", String(result.expiresInSeconds));
        if (result.delivery) sessionStorage.setItem("auth_otp_delivery", JSON.stringify(result.delivery));

        navigate("/auth/otp");
        return;
      }

      const target = location.state?.from || (result.user?.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
      navigate(target, { replace: true });
    } catch (err) {
      setError(err.message || "Usuario o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-[#f5f7fb]">
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#071426] text-white animate__animated animate__fadeIn animate__faster">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,255,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,255,170,0.08),_transparent_30%)]" />
        <div className="absolute top-20 right-24 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Random<span className="text-cyan-400">Fates</span>
            </h1>
          </div>

          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs tracking-[0.25em] text-cyan-300 font-semibold">SISTEMA ACTIVO</span>
            </div>

            <h2 className="text-5xl leading-tight font-bold mb-6">
              Sorteos digitales,
              <br />
              <span className="text-cyan-400">verificables y auditables.</span>
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed mb-12">
              Inicia sesión con JWT real, consume los servicios del sistema y conserva una sesión segura en el navegador.
            </p>

            <div className="space-y-5">
              <FeatureItem icon={<ShieldCheck size={20} />} title="Resultados verificables" description="Hash público, ganador persistido y trazabilidad de ejecución." />
              <FeatureItem icon={<Clock3 size={20} />} title="Estados reales" description="DRAFT, ACTIVE, FINISHED y CANCELLED vienen desde PostgreSQL." />
              <FeatureItem icon={<FileSpreadsheet size={20} />} title="Participantes reales" description="Carga manual o masiva usando los JSON schemas del backend." />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-cyan-400 border border-white/10" />
            <div className="w-10 h-10 rounded-full bg-emerald-300 -ml-3 border border-white/10" />
            <div className="w-10 h-10 rounded-full bg-yellow-200 -ml-3 border border-white/10" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10 animate__animated animate__fadeIn animate__fast">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Random<span className="text-cyan-500">Fates</span></h1>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 p-8">
            <div className="mb-8">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-5">
                <Sparkles className="text-cyan-500 animate-pulse" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Iniciar sesión</h2>
              <p className="text-slate-500">Accede a RandomFates.</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Correo electrónico</label>
                <input type="email" placeholder="demo@randomfates.test" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña</label>
                <input type="password" placeholder="Password123" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
              </div>

              <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-xs text-cyan-800">
                Para pruebas usa el seed: <strong>{demoSeed.email}</strong> / <strong>{demoSeed.password}</strong>.
              </div>

              {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

              <button disabled={loading} className="w-full py-3 rounded-2xl bg-[#071426] hover:bg-[#0d1f38] text-white font-semibold transition-all duration-300 disabled:opacity-60">
                {loading ? "Validando..." : "Ingresar"}
              </button>

              <div className="text-center text-sm text-slate-500 pt-4">
                ¿No tienes cuenta? <Link to="/register" className="text-cyan-600 hover:text-cyan-500 font-semibold">Crear cuenta</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-transparent p-2 transition duration-300 hover:border-white/10 hover:bg-white/[0.03]">
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-cyan-400 shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-white text-lg">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default Login;
