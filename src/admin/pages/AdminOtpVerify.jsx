import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp, resendOtp } from "../../services/authService";
import { KeyRound, ArrowLeft } from "lucide-react";

function maskEmail(email = "") {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const start = local.slice(0, 2);
  return `${start}***@${domain}`;
}

function AdminOtpVerify() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const s = sessionStorage.getItem("auth_otp_expires");
    return s ? Number(s) : 300;
  });
  const timerRef = useRef(null);

  const challengeToken = sessionStorage.getItem("auth_challenge_token");
  const pendingEmail = sessionStorage.getItem("auth_pending_email");

  useEffect(() => {
    if (!challengeToken) {
      navigate("/admin/login");
      return;
    }
  }, [challengeToken, navigate]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (s) => {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleVerify = async (e) => {
    e?.preventDefault();
    setError("");
    setSuccess("");

    if (!/^[0-9]{6}$/.test(otp)) {
      setError("El OTP debe tener 6 dígitos.");
      return;
    }

    const token = sessionStorage.getItem("auth_challenge_token");
    if (!token) {
      setError("La sesión de verificación no es válida. Vuelve a iniciar sesión.");
      navigate("/admin/login");
      return;
    }

    try {
      setLoading(true);
      await verifyOtp(token, otp);
      // verifyOtp stores the session (tokens + user)
      // cleanup
      const redirectTarget = sessionStorage.getItem("auth_pending_target") || "/admin/dashboard";
      sessionStorage.removeItem("auth_challenge_token");
      sessionStorage.removeItem("auth_pending_email");
      sessionStorage.removeItem("auth_otp_expires");
      sessionStorage.removeItem("auth_otp_delivery");
      sessionStorage.removeItem("auth_pending_target");

      navigate(redirectTarget, { replace: true });
    } catch (err) {
      const code = err?.code || err?.response?.error?.code;
      if (code === "UNAUTHORIZED") {
        setError(err.message || "El código ingresado no es válido. Inténtalo nuevamente.");
      } else if (code === "VALIDATION_ERROR") {
        setError("La sesión de verificación no es válida. Vuelve a iniciar sesión.");
      } else {
        setError(err.message || "Error verificando el código. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");

    const token = sessionStorage.getItem("auth_challenge_token");
    if (!token) {
      setError("La sesión de verificación no es válida. Vuelve a iniciar sesión.");
      navigate("/admin/login");
      return;
    }

    try {
      setLoading(true);
      const data = await resendOtp(token);
      if (data?.challengeToken) {
        sessionStorage.setItem("auth_challenge_token", data.challengeToken);
      }
      if (data?.expiresInSeconds) {
        sessionStorage.setItem("auth_otp_expires", String(data.expiresInSeconds));
        setSecondsLeft(Number(data.expiresInSeconds));
      } else {
        setSecondsLeft(300);
      }
      if (data?.delivery) sessionStorage.setItem("auth_otp_delivery", JSON.stringify(data.delivery));

      setSuccess("Se envió un nuevo código a tu correo.");
    } catch (err) {
      setError(err.message || "No se pudo reenviar el código. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    sessionStorage.removeItem("auth_challenge_token");
    sessionStorage.removeItem("auth_pending_email");
    sessionStorage.removeItem("auth_otp_expires");
    sessionStorage.removeItem("auth_otp_delivery");
    sessionStorage.removeItem("auth_pending_target");
    navigate("/admin/login", { replace: true });
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
              <KeyRound size={40} />
            </div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-cyan-300 backdrop-blur-sm">
              VERIFICACIÓN OTP
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Código de acceso</h1>
            <p className="mt-3 text-slate-400">
              Ingresa el código enviado a <strong>{pendingEmail ? maskEmail(pendingEmail) : "tu correo"}</strong>
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Código OTP (6 dígitos)</label>
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                placeholder="000000"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 py-4 px-5 text-center text-white text-2xl tracking-widest outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-400/10 font-semibold"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
                {success}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                disabled={loading}
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 py-4 font-semibold text-slate-950 shadow-xl shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-cyan-300 disabled:opacity-60"
              >
                {loading ? "Verificando..." : "Verificar código"}
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/50 py-3 font-semibold text-slate-300 transition hover:border-cyan-400 hover:bg-slate-800 hover:text-cyan-400 disabled:opacity-60"
              >
                Reenviar código
              </button>
            </div>

            <div className="text-center text-sm text-slate-400">
              Tiempo restante: <span className="font-semibold text-cyan-400">{formatTime(secondsLeft)}</span>
            </div>

            <div className="text-center text-xs text-slate-500">Si no recibes el correo, revisa tu carpeta de spam.</div>
          </form>

          <button
            onClick={handleBackToLogin}
            className="mt-8 flex items-center justify-center gap-2 w-full text-slate-400 hover:text-cyan-300 transition text-sm"
          >
            <ArrowLeft size={16} />
            Volver al login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminOtpVerify;
