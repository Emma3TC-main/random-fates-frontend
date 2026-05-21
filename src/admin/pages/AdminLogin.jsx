import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Shield } from "lucide-react";

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
      <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-sky-500/10 blur-3xl" />

      <div className="w-full max-w-md rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-10 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-400/10 text-cyan-400">
            <Shield size={40} />
          </div>

          <h1 className="text-4xl font-bold text-white">Admin Access</h1>

          <p className="mt-3 text-slate-400">RandomFates Control Center</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>

            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              placeholder="admin@randomfates.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-2xl bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-400 py-4 font-semibold text-white shadow-xl shadow-cyan-400/20 transition hover:bg-cyan-500"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
