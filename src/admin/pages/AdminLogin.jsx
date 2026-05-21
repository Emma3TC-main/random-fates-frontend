import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Shield,
  LockKeyhole,
  Mail,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import "animate.css";

import { loginAdmin } from "../services/adminAuthService";

function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginAdmin(form.email, form.password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />

        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-3xl animate-pulse" />

        <div className="absolute left-1/2 top-1/3 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-cyan-400/5 blur-3xl" />
      </div>

      {/* GRID EFFECT */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px]" />

      {/* CARD */}
      <div className="animate__animated animate__fadeInUp animate__faster relative w-full max-w-md overflow-hidden rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-10 shadow-[0_20px_80px_rgba(6,182,212,0.12)] backdrop-blur-2xl transition duration-500 hover:shadow-[0_20px_100px_rgba(6,182,212,0.18)]">
        {/* Glow */}
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10">
          {/* HEADER */}
          <div className="mb-8 text-center">
            <div className="animate__animated animate__zoomIn animate__fast mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/10 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-500/10 transition duration-300 hover:scale-105 hover:rotate-3">
              <Shield size={40} />
            </div>

            <div className="animate__animated animate__fadeIn animate__fast mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-cyan-300 backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse" />
              ADMIN PANEL
            </div>

            <h1 className="animate__animated animate__fadeInUp animate__fast text-4xl font-bold tracking-tight text-white">
              Admin Access
            </h1>

            <p className="animate__animated animate__fadeInUp animate__fast mt-3 text-slate-400">
              RandomFates Control Center
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="animate__animated animate__fadeInUp animate__fast space-y-5"
          >
            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>

              <div className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition duration-300 group-focus-within:text-cyan-400">
                  <Mail size={18} />
                </div>

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 py-4 pl-12 pr-5 text-white outline-none transition duration-300 placeholder:text-slate-500 focus:border-cyan-400 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-400/10"
                  placeholder="admin@randomfates.com"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <div className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition duration-300 group-focus-within:text-cyan-400">
                  <LockKeyhole size={18} />
                </div>

                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 py-4 pl-12 pr-5 text-white outline-none transition duration-300 placeholder:text-slate-500 focus:border-cyan-400 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-400/10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="animate__animated animate__headShake rounded-2xl border border-red-500/10 bg-red-500/10 p-4 text-sm text-red-400 backdrop-blur-sm">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 py-4 font-semibold text-slate-950 shadow-xl shadow-cyan-400/20 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-cyan-400/30"
            >
              Access Dashboard

              <ArrowRight
                size={18}
                className="transition duration-300 group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* FOOTER */}
          <div className="animate__animated animate__fadeIn animate__fast mt-8 text-center text-xs text-slate-500">
            Secure administrative environment · RandomFates
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;