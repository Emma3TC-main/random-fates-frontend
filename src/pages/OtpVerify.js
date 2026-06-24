import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp, resendOtp } from "../services/authService";

function maskEmail(email = "") {
    const [local, domain] = email.split("@");
    if (!local || !domain) return email;
    const start = local.slice(0, 2);
    return `${start}***@${domain}`;
}

function OtpVerify() {
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
            navigate("/login");
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
            navigate("/login");
            return;
        }

        try {
            setLoading(true);
            await verifyOtp(token, otp);
            // verifyOtp stores the session (tokens + user)
            // cleanup
            sessionStorage.removeItem("auth_challenge_token");
            sessionStorage.removeItem("auth_pending_email");
            sessionStorage.removeItem("auth_otp_expires");
            sessionStorage.removeItem("auth_otp_delivery");

            navigate("/dashboard", { replace: true });
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
            navigate("/login");
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">
            <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow">
                <h2 className="text-2xl font-bold mb-2">Verificar código OTP</h2>
                <p className="text-sm text-slate-600 mb-4">Código enviado a <strong>{pendingEmail ? maskEmail(pendingEmail) : "tu correo"}</strong></p>

                <form onSubmit={handleVerify} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Código de 6 dígitos</label>
                        <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>

                    {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
                    {success && <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>}

                    <div className="flex items-center justify-between gap-4">
                        <button disabled={loading} type="submit" className="flex-1 py-3 rounded-2xl bg-[#071426] text-white font-semibold disabled:opacity-60">
                            {loading ? "Verificando..." : "Verificar código"}
                        </button>

                        <button type="button" onClick={handleResend} disabled={loading} className="py-3 px-4 rounded-2xl border border-slate-200 text-sm text-slate-700 disabled:opacity-60">
                            Reenviar código
                        </button>
                    </div>

                    <div className="text-sm text-slate-500 text-center">Tiempo restante: {formatTime(secondsLeft)}</div>

                    <div className="text-center text-xs text-slate-400">Si no recibes el correo, revisa tu carpeta de spam.</div>
                </form>
            </div>
        </div>
    );
}

export default OtpVerify;
