import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, ShieldCheck, Trophy, UserPlus, Users } from "lucide-react";
import "animate.css";

import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleRegister = async (event) => {
    event?.preventDefault();
    setError("");

    if (!form.email || !form.password || !form.confirmPassword) {
      setError("Completa correo, contraseña y confirmación.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres para cumplir el schema del backend.");
      return;
    }

    try {
      setLoading(true);
      await registerUser({ email: form.email.trim(), password: form.password });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "No se pudo crear la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-[#f5f7fb]">
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#071426] text-white animate__animated animate__fadeIn animate__faster">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,255,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,255,170,0.08),_transparent_30%)]" />
        <div className="absolute top-16 left-20 w-36 h-36 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-16 w-44 h-44 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          <h1 className="text-3xl font-bold tracking-tight">Random<span className="text-cyan-400">Fates</span></h1>

          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs tracking-[0.25em] text-cyan-300 font-semibold">CUENTA REAL</span>
            </div>
            <h2 className="text-5xl leading-tight font-bold mb-6">Regístrate con el backend<br /><span className="text-cyan-400">y empieza a sortear.</span></h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-12">El frontend envía únicamente el schema aceptado por la API: email y password. Los datos visuales quedan separados de la persistencia.</p>
            <div className="space-y-5">
              <FeatureItem icon={<Users size={20} />} title="Participantes reales" description="Carga manual o masiva por endpoint." />
              <FeatureItem icon={<Trophy size={20} />} title="Premios persistidos" description="Premios y ganadores quedan en PostgreSQL." />
              <FeatureItem icon={<ShieldCheck size={20} />} title="JWT + RBAC" description="Roles y permisos del sistema." />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-cyan-400 border border-white/10" />
            <div className="w-10 h-10 rounded-full bg-emerald-300 -ml-3 border border-white/10" />
            <div className="w-10 h-10 rounded-full bg-yellow-200 -ml-3 border border-white/10" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10 animate__animated animate__fadeIn animate__faster">
        <div className="w-full max-w-lg">
          <div className="lg:hidden mb-10 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Random<span className="text-cyan-500">Fates</span></h1>
          </div>

          <form onSubmit={handleRegister} className="bg-white rounded-3xl border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8">
            <div className="mb-8">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-5">
                <UserPlus className="text-cyan-500 animate-pulse" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Crear cuenta</h2>
              <p className="text-slate-500">Crea un usuario USER según el schema del backend.</p>
            </div>

            <div className="space-y-5">
              <InputField icon={<Mail size={18} />} label="Correo electrónico" type="email" name="email" placeholder="tu-correo@randomfates.test" value={form.email} onChange={handleChange} />
              <InputField icon={<LockKeyhole size={18} />} label="Contraseña" type="password" name="password" placeholder="Mínimo 8 caracteres" value={form.password} onChange={handleChange} />
              <InputField icon={<LockKeyhole size={18} />} label="Confirmar contraseña" type="password" name="confirmPassword" placeholder="Repite tu contraseña" value={form.confirmPassword} onChange={handleChange} />

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
                El perfil extendido queda preparado para una siguiente iteración sin cambiar ahora el schema estable de backend.
              </div>

              {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

              <button disabled={loading} className="w-full py-3 rounded-2xl bg-[#071426] hover:bg-[#0d1f38] text-white font-semibold transition-all duration-300 disabled:opacity-60">
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </button>

              <div className="text-center text-sm text-slate-500 pt-2">
                ¿Ya tienes una cuenta? <Link to="/login" className="text-cyan-600 hover:text-cyan-500 font-semibold">Inicia sesión</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({ icon, label, type, name, placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500">{icon}</div>
        <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
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

export default Register;
