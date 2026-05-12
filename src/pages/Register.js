import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  UserPlus,
  ShieldCheck,
  Users,
  Trophy,
  Mail,
  LockKeyhole,
  User,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    if (
      !form.nombre ||
      !form.usuario ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Completa todos los campos");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    alert("Cuenta creada correctamente");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-[#f5f7fb]">
      {/* PANEL IZQUIERDO */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#071426] text-white">
        {/* Gradientes */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,255,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,255,170,0.08),_transparent_30%)]" />

        {/* Efectos */}
        <div className="absolute top-16 left-20 w-36 h-36 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-16 w-44 h-44 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-16 w-4 h-4 bg-cyan-300 rounded-full opacity-80" />
        <div className="absolute bottom-1/4 left-24 w-5 h-5 bg-emerald-300 rounded-full opacity-70" />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          {/* Logo */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Random
              <span className="text-cyan-400">Fates</span>
            </h1>
          </div>

          {/* Hero */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>

              <span className="text-xs tracking-[0.25em] text-cyan-300 font-semibold">
                CREA TU CUENTA
              </span>
            </div>

            {/* Título */}
            <h2 className="text-5xl leading-tight font-bold mb-6">
              Comienza a crear
              <br />
              <span className="text-cyan-400">sorteos increíbles.</span>
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed mb-12">
              Únete a RandomFates y administra participantes, premios y
              resultados desde una plataforma moderna y segura.
            </p>

            {/* Features */}
            <div className="space-y-5">
              <FeatureItem
                icon={<Users size={20} />}
                title="Gestión de participantes"
                description="Organiza miles de usuarios fácilmente desde un solo panel."
              />

              <FeatureItem
                icon={<Trophy size={20} />}
                title="Sorteos profesionales"
                description="Crea dinámicas atractivas y totalmente transparentes."
              />

              <FeatureItem
                icon={<ShieldCheck size={20} />}
                title="Plataforma segura"
                description="Protección avanzada para tus sorteos y usuarios."
              />
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-cyan-400 border border-white/10" />
            <div className="w-10 h-10 rounded-full bg-emerald-300 -ml-3 border border-white/10" />
            <div className="w-10 h-10 rounded-full bg-cyan-200 -ml-3 border border-white/10" />
            <div className="w-10 h-10 rounded-full bg-yellow-200 -ml-3 border border-white/10" />
          </div>
        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Random<span className="text-cyan-500">Fates</span>
            </h1>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-5">
                <UserPlus className="text-cyan-500" size={28} />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Crear cuenta
              </h2>

              <p className="text-slate-500">
                Regístrate y empieza a gestionar tus sorteos.
              </p>
            </div>

            {/* Formulario */}
            <div className="space-y-5">
              {/* Nombre */}
              <InputField
                icon={<User size={18} />}
                label="Nombre completo"
                type="text"
                name="nombre"
                placeholder="Ingresa tu nombre"
                value={form.nombre}
                onChange={handleChange}
              />

              {/* Usuario */}
              <InputField
                icon={<Sparkles size={18} />}
                label="Usuario"
                type="text"
                name="usuario"
                placeholder="Crea un usuario"
                value={form.usuario}
                onChange={handleChange}
              />

              {/* Email */}
              <InputField
                icon={<Mail size={18} />}
                label="Correo electrónico"
                type="email"
                name="email"
                placeholder="Ingresa tu correo"
                value={form.email}
                onChange={handleChange}
              />

              {/* Password */}
              <InputField
                icon={<LockKeyhole size={18} />}
                label="Contraseña"
                type="password"
                name="password"
                placeholder="Crea una contraseña"
                value={form.password}
                onChange={handleChange}
              />

              {/* Confirm Password */}
              <InputField
                icon={<LockKeyhole size={18} />}
                label="Confirmar contraseña"
                type="password"
                name="confirmPassword"
                placeholder="Repite tu contraseña"
                value={form.confirmPassword}
                onChange={handleChange}
              />

              {/* Checkbox */}
              <label className="flex items-start gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-slate-300"
                />

                <span>
                  Acepto los{" "}
                  <button className="text-cyan-600 font-medium hover:text-cyan-500">
                    términos y condiciones
                  </button>
                </span>
              </label>

              {/* Botón */}
              <button
                onClick={handleRegister}
                className="w-full py-3 rounded-2xl bg-[#071426] hover:bg-[#0d1f38] text-white font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/10"
              >
                Crear cuenta
              </button>

              {/* Footer */}
              <div className="text-center text-sm text-slate-500 pt-2">
                ¿Ya tienes una cuenta?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-cyan-600 hover:text-cyan-500 font-semibold"
                >
                  Inicia sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */
function InputField({ icon, label, type, name, placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
        />
      </div>
    </div>
  );
}

/* FEATURE ITEM */
function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-cyan-400 shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-white text-lg">{title}</h3>

        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default Register;
