import { useEffect, useState } from "react";
import { CreditCard, RefreshCw, ShieldCheck, UserCircle } from "lucide-react";
import {
  billingService,
  formatPlanPrice,
  getPlanMonths,
} from "../services/billingService";
import {
  getAuthUser,
  syncAuthUser,
  updateProfile,
} from "../services/authService";

function Account() {
  const [user, setUser] = useState(getAuthUser());
  const [account, setAccount] = useState(null);
  const [form, setForm] = useState({
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const [freshUser, accountData] = await Promise.all([
        syncAuthUser().catch(() => getAuthUser()),
        billingService.getAccount(),
      ]);
      setUser(freshUser);
      setForm((prev) => ({ ...prev, email: freshUser?.email || prev.email }));
      setAccount(accountData);
    } catch (err) {
      setError(err.message || "No se pudo cargar el estado de cuenta.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleProfile = async (event) => {
    event.preventDefault();
    try {
      setBusy(true);
      setError("");
      setMessage("");
      const payload = {
        email: form.email,
        ...(form.newPassword
          ? {
              currentPassword: form.currentPassword,
              newPassword: form.newPassword,
            }
          : {}),
      };
      const updated = await updateProfile(payload);
      setUser(updated);
      setForm((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
      setMessage("Perfil actualizado correctamente.");
    } catch (err) {
      setError(err.message || "No se pudo actualizar el perfil.");
    } finally {
      setBusy(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setBusy(true);
      setError("");
      setMessage("");
      await billingService.cancelSubscription();
      setMessage("Suscripción cancelada. Tu cuenta volverá a Free.");
      await load();
    } catch (err) {
      setError(err.message || "No se pudo cancelar la suscripción.");
    } finally {
      setBusy(false);
    }
  };

  const subscription = account?.subscription;
  const entitlements = account?.entitlements;
  const payments = account?.payments || [];
  const usage = account?.usage;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-cyan-50 to-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
              <UserCircle size={16} /> Mi cuenta
            </span>
            <h1 className="mt-4 text-4xl font-black text-slate-900">
              Perfil, suscripción y pagos
            </h1>
            <p className="mt-2 text-slate-500">
              Gestiona tus datos, revisa tu estado de cuenta y controla tus
              beneficios SaaS.
            </p>
          </div>
          <button
            onClick={load}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />{" "}
            Actualizar
          </button>
        </div>

        {error && <Alert tone="red" text={error} />}
        {message && <Alert tone="green" text={message} />}

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <UserCircle className="text-cyan-500" /> Datos de usuario
            </h2>
            <form onSubmit={handleProfile} className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Correo
                </span>
                <input
                  value={form.email}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Contraseña actual
                  </span>
                  <input
                    type="password"
                    value={form.currentPassword}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        currentPassword: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Nueva contraseña
                  </span>
                  <input
                    type="password"
                    value={form.newPassword}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        newPassword: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </label>
              </div>
              <button
                disabled={busy}
                className="w-full rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-900 hover:bg-cyan-300 disabled:opacity-60"
              >
                Guardar cambios
              </button>
            </form>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <ShieldCheck className="text-emerald-500" /> Estado de suscripción
            </h2>
            <div className="mt-5 rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Plan actual
                  </p>
                  <h3 className="text-3xl font-black text-slate-900">
                    {subscription?.plan?.name ||
                      entitlements?.planName ||
                      "Free"}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {subscription
                      ? `Activo hasta ${new Date(subscription.endsAt).toLocaleDateString()}`
                      : "Sin suscripción pagada activa"}
                  </p>
                </div>
                {subscription && (
                  <button
                    onClick={handleCancelSubscription}
                    disabled={busy}
                    className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
                  >
                    Cancelar suscripción
                  </button>
                )}
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Mini
                label="CSV"
                value={entitlements?.allowCsvImport ? "Sí" : "No"}
              />
              <Mini
                label="Intentos Free usados"
                value={`${usage?.freeExecutionsUsed ?? 0}/${entitlements?.maxExecutionsPerMonth < 0 ? "∞" : (entitlements?.maxExecutionsPerMonth ?? 5)}`}
              />
              <Mini
                label="Participantes/sorteo"
                value={
                  entitlements?.maxParticipantsPerRaffle < 0
                    ? "∞"
                    : (entitlements?.maxParticipantsPerRaffle ?? 25)
                }
              />
            </div>
          </section>
        </div>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <CreditCard className="text-cyan-500" /> Historial de pagos
          </h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-[0.16em] text-slate-500">
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Monto</th>
                  <th className="px-4 py-3">Periodo</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Referencia</th>
                  <th className="px-4 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-slate-100">
                    <td className="px-4 py-4 font-semibold text-slate-900">
                      {payment.subscription?.plan?.name || "Plan"}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {formatPlanPrice({ price: payment.amount })}{" "}
                      {payment.currency}
                    </td>
                    <td className="px-4 py-4 text-slate-500">
                      {getPlanMonths(payment.subscription?.plan) || 1} mes(es)
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                        {payment.status}
                      </span>
                    </td>
                    <td className="max-w-[220px] truncate px-4 py-4 text-slate-500">
                      {payment.transactionReference}
                    </td>
                    <td className="px-4 py-4 text-slate-500">
                      {new Date(payment.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {!loading && payments.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-10 text-center text-slate-500"
                    >
                      Aún no tienes pagos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function Mini({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
    </div>
  );
}

function Alert({ tone, text }) {
  const styles =
    tone === "red"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";
  return (
    <div className={`rounded-2xl border p-4 text-sm font-semibold ${styles}`}>
      {text}
    </div>
  );
}

export default Account;
