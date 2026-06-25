import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  Copy,
  FileSpreadsheet,
  PlayCircle,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trophy,
  Users,
  XCircle,
} from "lucide-react";
import "animate.css";

import { executionService } from "../services/executionService";
import { participantService } from "../services/participantService";
import { prizeService } from "../services/prizeService";
import { raffleService } from "../services/raffleService";
import { createPlayableDemoRaffle } from "../services/demoSeedService";
import {
  formatDate,
  getParticipantCount,
  getPrizeCount,
  getWinnerFromExecution,
  labelState,
  labelType,
  shortId,
  stateStyles,
} from "../utils/randomFatesFormat";

const initialRaffle = {
  title: "Sorteo campaña junio",
  description: "Sorteo para clientes registrados",
  type: "ROULETTE",
  isPublic: true,
};

const initialPrize = {
  name: "Gift Card S/100",
  description: "Premio principal",
  quantity: 1,
};

const defaultParticipantsText = `Ana Torres,DNI-001,ana@test.com
Luis Rojas,DNI-002,luis@test.com
María Pérez,DNI-003,maria@test.com
Carlos Sánchez,DNI-004,carlos@test.com`;

function Raffles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedIdFromUrl = searchParams.get("raffleId");
  const [raffles, setRaffles] = useState([]);
  const [selectedId, setSelectedId] = useState(selectedIdFromUrl || "");
  const [selected, setSelected] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [prizes, setPrizes] = useState([]);
  const [form, setForm] = useState(initialRaffle);
  const [prizeForm, setPrizeForm] = useState(initialPrize);
  const [participantsText, setParticipantsText] = useState(
    defaultParticipantsText,
  );
  const [lastExecution, setLastExecution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadRaffles = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await raffleService.list({ page: 1, limit: 100 });
      const list = Array.isArray(data) ? data : [];
      setRaffles(list);
      const nextSelected = selectedIdFromUrl || selectedId || list[0]?.id || "";
      setSelectedId(nextSelected);
      if (nextSelected) await loadDetail(nextSelected);
      if (!nextSelected) {
        setSelected(null);
        setParticipants([]);
        setPrizes([]);
      }
    } catch (err) {
      setError(err.message || "No se pudieron cargar los sorteos.");
    } finally {
      setLoading(false);
    }
  };

  const loadDetail = async (raffleId) => {
    if (!raffleId) return null;
    try {
      setError("");
      const [detail, participantsData, prizesData] = await Promise.all([
        raffleService.getById(raffleId),
        participantService.list(raffleId, { page: 1, limit: 200 }),
        prizeService.list(raffleId, { page: 1, limit: 50 }),
      ]);
      setSelected(detail);
      setParticipants(participantsData || []);
      setPrizes(prizesData || detail.prizes || []);
      setSelectedId(raffleId);
      setSearchParams({ raffleId });
      return detail;
    } catch (err) {
      setSelected(null);
      setParticipants([]);
      setPrizes([]);
      setError(err.message || "No se pudo cargar el detalle del sorteo.");
      return null;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadRaffles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedIdFromUrl && selectedIdFromUrl !== selectedId) {
      loadDetail(selectedIdFromUrl).catch((err) => setError(err.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIdFromUrl]);

  const runAction = async (successMessage, action) => {
    try {
      setBusy(true);
      setError("");
      setMessage("");
      const result = await action();
      setMessage(successMessage);
      return result;
    } catch (err) {
      setError(err.message || "Ocurrió un error.");
      return null;
    } finally {
      setBusy(false);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const created = await runAction(
      "Sorteo configurado y guardado correctamente.",
      () =>
        raffleService.create({
          ...form,
          configuration: {
            winnersCount: 1,
            animation:
              form.type === "SLOT"
                ? "slots"
                : form.type === "RANDOM_PICKER"
                  ? "random"
                  : "roulette",
            allowDuplicates: false,
            rules: [
              "Un participante por identificador",
              "Resultado verificable por hash",
            ],
          },
        }),
    );
    if (created?.id) {
      setForm(initialRaffle);
      await loadRaffles();
      await loadDetail(created.id);
    }
  };

  const handleCreateDemo = async () => {
    const demo = await runAction(
      "Demo oficial creado y listo para jugar.",
      () => createPlayableDemoRaffle("ROULETTE"),
    );
    if (demo?.id) {
      await loadRaffles();
      await loadDetail(demo.id);
    }
  };

  const handleCreatePrize = async (event) => {
    event.preventDefault();
    if (!selected?.id) return setError("Selecciona un sorteo primero.");
    const created = await runAction("Premio registrado.", () =>
      prizeService.create(selected.id, prizeForm),
    );
    if (created) {
      setPrizeForm(initialPrize);
      await loadDetail(selected.id);
    }
  };

  const parseParticipants = () => {
    return participantsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const [fullName, identifier, email] = line
          .split(",")
          .map((item) => item?.trim());
        return {
          fullName: fullName || `Participante ${index + 1}`,
          identifier: identifier || `FRONT-${Date.now()}-${index + 1}`,
          email: email || undefined,
          source: "MANUAL",
        };
      });
  };

  const handleBulkParticipants = async () => {
    if (!selected?.id) return setError("Selecciona un sorteo primero.");
    const parsed = parseParticipants();
    if (parsed.length === 0)
      return setError("Agrega al menos un participante.");
    const job = await runAction(
      "Lista de participantes importada con éxito.",
      () => participantService.bulk(selected.id, parsed, "frontend-form.csv"),
    );
    if (job) await loadDetail(selected.id);
  };

  const handlePublish = async () => {
    if (!selected?.id) return;
    const published = await runAction(
      "Sorteo publicado y listo para iniciar.",
      () => raffleService.publish(selected.id),
    );
    if (published) {
      await loadRaffles();
      await loadDetail(selected.id);
    }
  };

  const handleCancel = async () => {
    if (!selected?.id) return;
    const cancelled = await runAction("Sorteo cancelado.", () =>
      raffleService.cancel(selected.id),
    );
    if (cancelled) {
      await loadRaffles();
      await loadDetail(selected.id);
    }
  };

  const handleExecute = async () => {
    if (!selected?.id) return;
    const execution = await runAction("Sorteo realizado con éxito.", () =>
      executionService.execute(selected.id),
    );
    if (execution) {
      setLastExecution(execution);
      await loadRaffles();
      await loadDetail(selected.id);
    }
  };

  const copyText = async (value) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setMessage("Copiado al portapapeles.");
  };

  const winner = getWinnerFromExecution(lastExecution);
  const publicResultUrl = lastExecution?.result?.verificationHash
    ? `${process.env.REACT_APP_API_URL || "http://localhost:3000/v1"}/public/results/${lastExecution.result.verificationHash}/verify`
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-cyan-50 to-white px-6 py-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
              <ShieldCheck size={16} /> Panel de Administración
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
              Sorteos
            </h1>
            <p className="mt-2 max-w-3xl text-slate-500">
              Configura tus eventos oficiales, registra premios, carga listas
              completas de participantes, publica tus dinámicas y obtén
              resultados transparentes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={loadRaffles}
              disabled={loading || busy}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />{" "}
              Actualizar lista
            </button>
            <button
              onClick={handleCreateDemo}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
            >
              <FileSpreadsheet size={18} /> Generar juego demo
            </button>
          </div>
        </div>

        {error && <Alert tone="red" text={error} />}
        {message && <Alert tone="green" text={message} />}

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.3fr]">
          <div className="space-y-6">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                <Plus className="text-cyan-500" /> Nuevo sorteo
              </h2>
              <form onSubmit={handleCreate} className="mt-5 space-y-4">
                <Input
                  label="Título"
                  value={form.title}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, title: value }))
                  }
                />
                <Textarea
                  label="Descripción"
                  value={form.description}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, description: value }))
                  }
                />
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Tipo de juego
                  </label>
                  <select
                    value={form.type}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, type: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="ROULETTE">Ruleta</option>
                    <option value="RANDOM_PICKER">Selección aleatoria</option>
                    <option value="SLOT">Slots</option>
                  </select>
                </div>
                <button
                  disabled={busy}
                  className="w-full rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-900 hover:bg-cyan-300 disabled:opacity-60"
                >
                  Guardar y crear sorteo
                </button>
              </form>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">
                  Mis sorteos
                </h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  {raffles.length}
                </span>
              </div>
              <div className="mt-5 max-h-[520px] space-y-3 overflow-y-auto pr-2">
                {loading && <p className="text-slate-500">Cargando...</p>}
                {!loading && raffles.length === 0 && (
                  <p className="rounded-2xl bg-slate-50 p-5 text-slate-500">
                    Aún no hay sorteos guardados. Crea uno nuevo o usa un juego
                    demo para probar.
                  </p>
                )}
                {raffles.map((raffle) => (
                  <button
                    key={raffle.id}
                    onClick={() => loadDetail(raffle.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${selectedId === raffle.id ? "border-cyan-300 bg-cyan-50" : "border-slate-200 bg-white"}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {raffle.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {labelType(raffle.type)} · Identificador:{" "}
                          {shortId(raffle.id)}
                        </p>
                      </div>
                      <span
                        className={`rounded-full border px-2 py-1 text-xs font-semibold ${stateStyles[raffle.state]}`}
                      >
                        {labelState(raffle.state)}
                      </span>
                    </div>
                    <div className="mt-3 flex gap-3 text-xs text-slate-500">
                      <span>{getParticipantCount(raffle)} participantes</span>
                      <span>{getPrizeCount(raffle)} premios</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              {!selected ? (
                <div className="py-16 text-center text-slate-500">
                  Selecciona o crea un sorteo de la lista para empezar a
                  administrarlo.
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900">
                        {selected.title}
                      </h2>
                      <p className="mt-2 text-slate-500">
                        {selected.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-bold ${stateStyles[selected.state]}`}
                        >
                          {labelState(selected.state)}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                          {labelType(selected.type)}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                          {formatDate(selected.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selected.state === "DRAFT" && (
                        <button
                          disabled={busy}
                          onClick={handlePublish}
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-60"
                        >
                          <CheckCircle2 size={18} /> Publicar
                        </button>
                      )}
                      {selected.state === "ACTIVE" && (
                        <button
                          disabled={busy}
                          onClick={handleExecute}
                          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white hover:bg-violet-700 disabled:opacity-60"
                        >
                          <PlayCircle size={18} /> Resolver sorteo
                        </button>
                      )}
                      {selected.state === "ACTIVE" && (
                        <Link
                          to={`/games/${selected.type === "SLOT" ? "slots" : selected.type === "RANDOM_PICKER" ? "random-selection" : "roulette"}?raffleId=${selected.id}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-900 hover:bg-cyan-300"
                        >
                          <Trophy size={18} /> Pantalla de juego
                        </Link>
                      )}
                      {selected.state !== "FINISHED" && (
                        <button
                          disabled={busy}
                          onClick={handleCancel}
                          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-100 disabled:opacity-60"
                        >
                          <XCircle size={18} /> Cancelar
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <MiniStat
                      icon={<Users size={18} />}
                      label="Participantes"
                      value={participants.length}
                    />
                    <MiniStat
                      icon={<Trophy size={18} />}
                      label="Premios"
                      value={prizes.length}
                    />
                    <MiniStat
                      icon={<ShieldCheck size={18} />}
                      label="Estado actual"
                      value={labelState(selected.state)}
                    />
                  </div>

                  {selected.publicToken && (
                    <div className="mt-6 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 text-sm text-cyan-900">
                      <div className="flex items-center justify-between gap-3">
                        <span className="break-all">
                          Enlace de acceso público: {selected.publicToken}
                        </span>
                        <button
                          onClick={() => copyText(selected.publicToken)}
                          className="rounded-xl bg-white px-3 py-2 font-semibold text-cyan-700"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </section>

            {selected &&
              selected.state !== "FINISHED" &&
              selected.state !== "CANCELLED" && (
                <div className="grid gap-6 lg:grid-cols-2">
                  <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900">
                      Premios del evento
                    </h3>
                    <form
                      onSubmit={handleCreatePrize}
                      className="mt-4 space-y-3"
                    >
                      <Input
                        label="Nombre del premio"
                        value={prizeForm.name}
                        onChange={(value) =>
                          setPrizeForm((prev) => ({ ...prev, name: value }))
                        }
                      />
                      <Input
                        label="Descripción u observaciones"
                        value={prizeForm.description}
                        onChange={(value) =>
                          setPrizeForm((prev) => ({
                            ...prev,
                            description: value,
                          }))
                        }
                      />
                      <Input
                        label="Cantidad disponible"
                        type="number"
                        value={prizeForm.quantity}
                        onChange={(value) =>
                          setPrizeForm((prev) => ({
                            ...prev,
                            quantity: Number(value),
                          }))
                        }
                      />
                      <button
                        disabled={busy}
                        className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-bold text-white disabled:opacity-60"
                      >
                        Agregar premio
                      </button>
                    </form>
                    <div className="mt-4 space-y-2">
                      {prizes.map((prize) => (
                        <div
                          key={prize.id}
                          className="rounded-2xl bg-slate-50 p-3 text-sm"
                        >
                          <strong>{prize.name}</strong>
                          <br />
                          <span className="text-slate-500">
                            Cantidad: {prize.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900">
                      Carga masiva de participantes
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Formato requerido: nombre,identificador,email
                    </p>
                    <textarea
                      value={participantsText}
                      onChange={(event) =>
                        setParticipantsText(event.target.value)
                      }
                      rows={8}
                      className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <button
                      disabled={busy}
                      onClick={handleBulkParticipants}
                      className="mt-3 w-full rounded-2xl bg-cyan-400 px-4 py-3 font-bold text-slate-900 hover:bg-cyan-300 disabled:opacity-60"
                    >
                      Importar lista
                    </button>
                  </section>
                </div>
              )}

            {selected && (
              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">
                    Participantes inscritos
                  </h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">
                    {participants.length}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <div className="font-bold text-slate-900">
                        {participant.fullName}
                      </div>
                      <div className="text-sm text-slate-500">
                        ID: {participant.identifier}
                      </div>
                    </div>
                  ))}
                  {participants.length === 0 && (
                    <div className="rounded-2xl bg-slate-50 p-5 text-slate-500">
                      Aún no hay participantes inscritos en este evento.
                    </div>
                  )}
                </div>
              </section>
            )}

            {lastExecution && (
              <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
                <h3 className="text-2xl font-black text-slate-900">
                  Resultado generado
                </h3>
                <p className="mt-2 text-slate-600">
                  Ganador: <strong>{winner?.name}</strong> · Premio:{" "}
                  <strong>{winner?.prizeName}</strong>
                </p>
                <div className="mt-4 rounded-2xl bg-white p-4 text-xs text-slate-600">
                  <div className="break-all">
                    <strong>Código de validación oficial:</strong>{" "}
                    {lastExecution.result?.verificationHash}
                  </div>
                  <div className="mt-2 break-all">
                    <strong>Código semilla del sorteo:</strong>{" "}
                    {lastExecution.seedHash}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => copyText(publicResultUrl)}
                    className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-emerald-700"
                  >
                    Copiar enlace de comprobación
                  </button>
                  <a
                    href={publicResultUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white"
                  >
                    Verificar resultado público
                  </a>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponentes funcionales intactos
function Input({ label, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
      />
    </label>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
      />
    </label>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <div className="mt-2 text-2xl font-black text-slate-900">{value}</div>
    </div>
  );
}

function Alert({ tone, text }) {
  const styles =
    tone === "red"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";
  return (
    <div
      className={`mb-5 rounded-2xl border p-4 text-sm font-semibold ${styles}`}
    >
      {text}
    </div>
  );
}

export default Raffles;
