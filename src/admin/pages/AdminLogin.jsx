import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail, Shield, Sparkles } from "lucide-react";
import "animate.css";
import { loginAdmin } from "../services/adminAuthService";

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "admin@randomfates.test", password: "Password123" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      setLoading(true);
      const result = await loginAdmin(form.email, form.password);
      if (!result.success) {
        setError(result.message);
        return;
      }
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión como administrador.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-3xl animate-pulse" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="animate__animated animate__fadeInUp animate__faster relative w-full max-w-md overflow-hidden rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-10 shadow-[0_20px_80px_rgba(6,182,212,0.12)] backdrop-blur-2xl">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/10 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-500/10">
              <Shield size={40} />
            </div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-cyan-300 backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse" /> ADMIN REAL
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Admin Access</h1>
            <p className="mt-3 text-slate-400">Usa credenciales del backend con rol ADMIN.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field icon={<Mail size={18} />} label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            <Field icon={<LockKeyhole size={18} />} label="Password" name="password" type="password" value={form.password} onChange={handleChange} />

            <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4 text-xs leading-relaxed text-cyan-100">
              Si tu usuario aún es USER, promuévelo en Supabase: <code className="text-cyan-300">UPDATE users SET role='ADMIN' WHERE email='admin@randomfates.test';</code>
            </div>

            {error && <div className="rounded-2xl border border-red-500/10 bg-red-500/10 p-4 text-sm text-red-400">{error}</div>}

            <button disabled={loading} className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 py-4 font-semibold text-slate-950 shadow-xl shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-cyan-300 disabled:opacity-60">
              {loading ? "Validando..." : "Access Dashboard"}
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-500">
            <Link to="/login" className="text-cyan-300 hover:underline">Volver al login de usuario</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon, label, name, type, value, onChange }) {
  return <div><label className="mb-2 block text-sm font-medium text-slate-300">{label}</label><div className="group relative"><div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400">{icon}</div><input type={type} name={name} value={value} onChange={onChange} className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 py-4 pl-12 pr-5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-400/10" /></div></div>;
}

export default AdminLogin;
