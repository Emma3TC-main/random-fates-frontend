import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { billingService } from "../services/billingService";
import { syncAuthUser } from "../services/authService";

function BillingSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get("token") || params.get("orderId");
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(
    "Confirmando pago con PayPal Sandbox...",
  );

  useEffect(() => {
    const capture = async () => {
      if (!orderId) {
        setStatus("error");
        setMessage("No se encontró el token de PayPal en la URL.");
        return;
      }

      try {
        await billingService.capturePaypalOrder(orderId);
        await syncAuthUser().catch(() => null);
        setStatus("success");
        setMessage("Pago aprobado. Tu suscripción Premium ya está activa.");
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "No se pudo confirmar el pago.");
      }
    };

    capture();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-cyan-50 to-white px-6 py-20">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
        {status === "loading" && (
          <Loader2 className="mx-auto animate-spin text-cyan-500" size={48} />
        )}
        {status === "success" && (
          <CheckCircle2 className="mx-auto text-emerald-500" size={56} />
        )}
        {status === "error" && (
          <XCircle className="mx-auto text-red-500" size={56} />
        )}
        <h1 className="mt-5 text-3xl font-black text-slate-900">
          Resultado del pago
        </h1>
        <p className="mt-3 text-slate-600">{message}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/account"
            className="rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-900"
          >
            Ver cuenta
          </Link>
          <Link
            to="/raffles"
            className="rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700"
          >
            Ir a sorteos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BillingSuccess;
