import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import {
  billingService,
  formatPlanPrice,
  getPlanMonths,
  getPlanTier,
} from "../../services/billingService";
import { isAuthenticated } from "../../services/authService";

const fallbackPlans = [
  {
    id: "free-fallback",
    name: "Free",
    price: 0,
    features: {
      tier: "FREE",
      maxExecutionsPerMonth: 5,
      maxParticipantsPerRaffle: 25,
      allowCsvImport: false,
      offer: "Empieza sin pagar",
    },
  },
  {
    id: "premium-monthly-fallback",
    name: "Premium Mensual",
    price: 9,
    features: {
      tier: "PREMIUM",
      billingPeriodMonths: 1,
      allowCsvImport: true,
      badge: "RECOMENDADO",
      offer: "Sandbox PayPal",
    },
  },
  {
    id: "premium-annual-fallback",
    name: "Premium Anual",
    price: 89,
    features: {
      tier: "PREMIUM",
      billingPeriodMonths: 12,
      allowCsvImport: true,
      badge: "2 MESES GRATIS",
      offer: "Ahorro anual",
    },
  },
];

const featuresForPlan = (plan) => {
  const features = plan.features || {};
  if (getPlanTier(plan) === "FREE") {
    return [
      `${features.maxExecutionsPerMonth ?? 5} ejecuciones gratuitas al mes`,
      `${features.maxParticipantsPerRaffle ?? 25} participantes por sorteo`,
      "Registro manual",
      "Hash verificable",
    ];
  }

  return [
    "Ejecuciones ilimitadas",
    "Carga CSV con validación",
    `${features.maxParticipantsPerRaffle < 0 ? "∞" : features.maxParticipantsPerRaffle || 1000} participantes por sorteo`,
    "Auditoría avanzada",
    "Gestión de pagos y cuenta",
  ];
};

function PricingSection() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState(fallbackPlans);
  const [loading, setLoading] = useState(false);
  const [busyPlanId, setBusyPlanId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    billingService
      .listPlans()
      .then((data) => {
        if (mounted && Array.isArray(data) && data.length > 0) setPlans(data);
      })
      .catch(() => null)
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const startCheckout = async (plan) => {
    setError("");

    if (getPlanTier(plan) === "FREE" || Number(plan.price || 0) <= 0) {
      navigate(isAuthenticated() ? "/raffles" : "/register");
      return;
    }

    if (!isAuthenticated()) {
      navigate("/login", { state: { from: "/account" } });
      return;
    }

    try {
      setBusyPlanId(plan.id);
      const data = await billingService.createPaypalOrder(plan.id);
      if (!data?.approvalUrl)
        throw new Error("PayPal no devolvió enlace de aprobación.");
      window.location.href = data.approvalUrl;
    } catch (err) {
      setError(err.message || "No se pudo iniciar el pago con PayPal Sandbox.");
    } finally {
      setBusyPlanId(null);
    }
  };

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Planes simples para empezar y escalar
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Free tiene intentos limitados. Premium activa PayPal Sandbox, CSV y
            capacidades avanzadas.
          </p>
          {loading && (
            <p className="mt-3 text-sm text-slate-500">
              Sincronizando planes...
            </p>
          )}
          {error && (
            <p className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const features = plan.features || {};
            const isPremium =
              getPlanTier(plan) !== "FREE" && Number(plan.price || 0) > 0;
            const months = getPlanMonths(plan);
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl border p-8 ${isPremium ? "border-cyan-400 bg-cyan-400/5 shadow-[0_0_80px_rgba(34,211,238,0.16)]" : "border-white/10 bg-white/5"}`}
              >
                {features.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 px-5 py-2 text-sm font-bold text-black">
                    {features.badge}
                  </div>
                )}
                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                <p className="mb-6 text-muted-foreground">
                  {features.offer || features.label || "Plan RandomFates"}
                </p>
                <div className="mb-8">
                  <span className="text-5xl font-bold">
                    {formatPlanPrice(plan)}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}
                    {months >= 12 ? "/año" : months > 0 ? "/mes" : "/free"}
                  </span>
                </div>
                <div className="mb-8 space-y-4">
                  {featuresForPlan(plan).map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="text-cyan-400" size={18} />
                      <span>{item}</span>
                    </div>
                  ))}
                  {!features.allowCsvImport && (
                    <div className="opacity-40 line-through">CSV/XLSX</div>
                  )}
                </div>
                <button
                  disabled={busyPlanId === plan.id}
                  onClick={() => startCheckout(plan)}
                  className={`w-full rounded-2xl px-6 py-4 font-bold transition-all disabled:opacity-60 ${isPremium ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/30 hover:bg-cyan-300" : "border border-white/20 bg-white text-black hover:bg-cyan-100"}`}
                >
                  {busyPlanId === plan.id ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" /> Preparando
                      PayPal
                    </span>
                  ) : isPremium ? (
                    "Pagar con PayPal Sandbox"
                  ) : (
                    "Empezar gratis"
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          También puedes revisar tu suscripción desde{" "}
          <Link to="/account" className="font-bold text-cyan-600">
            Mi cuenta
          </Link>
          .
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
