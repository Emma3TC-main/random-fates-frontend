import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

function BillingCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-cyan-50 to-white px-6 py-20">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
        <XCircle className="mx-auto text-amber-500" size={56} />
        <h1 className="mt-5 text-3xl font-black text-slate-900">
          Pago cancelado
        </h1>
        <p className="mt-3 text-slate-600">
          No se aplicó ningún cargo ni cambio de suscripción.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/account"
            className="rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-900"
          >
            Ver cuenta
          </Link>
          <Link
            to="/"
            className="rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BillingCancel;
