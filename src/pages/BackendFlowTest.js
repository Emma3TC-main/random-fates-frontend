import { useState } from "react";
import { apiFetch } from "../api/client";
import { endpoints } from "../api/endpoints";
import { registerUser, loginUser, getAuthUser } from "../services/authService";
import { raffleService } from "../services/raffleService";
import { prizeService } from "../services/prizeService";
import { participantService } from "../services/participantService";
import { executionService } from "../services/executionService";
import { resultService } from "../services/resultService";

const demoParticipants = [
  { fullName: "Ana Torres", identifier: "DNI-001", email: "ana@test.com" },
  { fullName: "Luis Rojas", identifier: "DNI-002", email: "luis@test.com" },
  { fullName: "María Pérez", identifier: "DNI-003", email: "maria@test.com" },
  {
    fullName: "Carlos Sánchez",
    identifier: "DNI-004",
    email: "carlos@test.com",
  },
];

export default function BackendFlowTest() {
  const [email, setEmail] = useState("demo@randomfates.test");
  const [password, setPassword] = useState("Password123");
  const [raffle, setRaffle] = useState(null);
  const [execution, setExecution] = useState(null);
  const [publicResult, setPublicResult] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const pushLog = (message, data) => {
    setLogs((prev) => [
      { time: new Date().toLocaleTimeString(), message, data },
      ...prev,
    ]);
  };

  const runStep = async (message, fn) => {
    try {
      setLoading(true);
      const data = await fn();
      pushLog(`✅ ${message}`, data);
      return data;
    } catch (error) {
      pushLog(
        `❌ ${message}: ${error.message}`,
        error.response || error.details || null,
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerOrLogin = async () => {
    return runStep("Auth listo", async () => {
      try {
        return await registerUser({ email, password });
      } catch (error) {
        await loginUser(email, password);
        return { success: true, user: getAuthUser() };
      }
    });
  };

  const createRaffle = async () => {
    const created = await runStep("Sorteo creado según schema", () =>
      raffleService.create({
        title: `Demo Frontend ${new Date().toLocaleTimeString()}`,
        description: "Sorteo creado desde React para probar integración real",
        type: "ROULETTE",
        isPublic: true,
        configuration: {
          winnersCount: 1,
          animation: "roulette",
          allowDuplicates: false,
        rules: [
            "Un participante por identificador",
            "Resultado verificable por hash",
          ],
        },
      }),
    );
    setRaffle(created);
    return created;
  };

  const addPrize = async () => {
    if (!raffle?.id) throw new Error("Primero crea un sorteo");
    return runStep("Premio creado", () =>
      prizeService.create(raffle.id, {
        name: "Gift Card S/100",
        description: "Premio de prueba frontend-backend",
        quantity: 1,
      }),
    );
  };

  const addParticipants = async () => {
    if (!raffle?.id) throw new Error("Primero crea un sorteo");
    return runStep("Participantes cargados", () =>
      participantService.bulk(
        raffle.id,
        demoParticipants,
        "frontend-demo.json",
      ),
    );
  };

  const publishRaffle = async () => {
    if (!raffle?.id) throw new Error("Primero crea un sorteo");
    const published = await runStep("Sorteo publicado", () =>
      raffleService.publish(raffle.id),
    );
    setRaffle(published);
    return published;
  };

  const executeRaffle = async () => {
    if (!raffle?.id) throw new Error("Primero crea un sorteo");
    const createdExecution = await runStep("Sorteo ejecutado", () =>
      executionService.execute(raffle.id),
    );
    setExecution(createdExecution);
    return createdExecution;
  };

  const verifyPublicResult = async () => {
    const hash = execution?.result?.verificationHash;
    if (!hash) throw new Error("Primero ejecuta el sorteo");

    const result = await runStep("Resultado público verificado", async () => {
      const [publicData, verification] = await Promise.all([
        resultService.getPublicByHash(hash),
        resultService.verify(hash),
      ]);
      return { publicData, verification };
    });

    setPublicResult(result);
    return result;
  };

  const runFullFlow = async () => {
    await registerOrLogin();
    const created = await createRaffle();
    await prizeService.create(created.id, {
      name: "Gift Card S/100",
      description: "Premio demo",
      quantity: 1,
    });
    pushLog("✅ Premio creado", null);
    await participantService.bulk(
      created.id,
      demoParticipants,
      "frontend-demo.json",
    );
    pushLog("✅ Participantes cargados", null);
    const published = await raffleService.publish(created.id);
    setRaffle(published);
    pushLog("✅ Sorteo publicado", published);
    const createdExecution = await executionService.execute(created.id);
    setExecution(createdExecution);
    pushLog("✅ Sorteo ejecutado", createdExecution);
    const hash = createdExecution?.result?.verificationHash;
    if (hash) {
      const verification = await resultService.verify(hash);
      setPublicResult(verification);
      pushLog("✅ Hash verificado", verification);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Prueba integrada Backend + Frontend
          </h1>
          <p className="mt-2 text-slate-500">
            Esta pantalla no cambia el backend. Solo consume los endpoints
            reales y respeta los JSON schemas generados.
          </p>
        </div>

        <div className="grid gap-4 rounded-3xl border bg-white p-6 shadow-sm md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border p-3"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Password
            </span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border p-3"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3 rounded-3xl border bg-white p-6 shadow-sm">
          <button
            disabled={loading}
            onClick={registerOrLogin}
            className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white disabled:opacity-50"
          >
            1. Auth
          </button>
          <button
            disabled={loading}
            onClick={createRaffle}
            className="rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-900 disabled:opacity-50"
          >
            2. Crear sorteo
          </button>
          <button
            disabled={loading}
            onClick={addPrize}
            className="rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-900 disabled:opacity-50"
          >
            3. Premio
          </button>
          <button
            disabled={loading}
            onClick={addParticipants}
            className="rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-900 disabled:opacity-50"
          >
            4. Participantes
          </button>
          <button
            disabled={loading}
            onClick={publishRaffle}
            className="rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white disabled:opacity-50"
          >
            5. Publicar
          </button>
          <button
            disabled={loading}
            onClick={executeRaffle}
            className="rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
          >
            6. Ejecutar
          </button>
          <button
            disabled={loading}
            onClick={verifyPublicResult}
            className="rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-900 disabled:opacity-50"
          >
            7. Verificar hash
          </button>
          <button
            disabled={loading}
            onClick={runFullFlow}
            className="rounded-xl bg-black px-4 py-3 font-semibold text-white disabled:opacity-50"
          >
            Flujo completo
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-bold">Estado actual</h2>
            <pre className="max-h-[520px] overflow-auto rounded-2xl bg-slate-950 p-4 text-xs text-cyan-100">
              {JSON.stringify(
                { authUser: getAuthUser(), raffle, execution, publicResult },
                null,
                2,
              )}
            </pre>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-bold">Logs</h2>
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div key={index} className="rounded-2xl border bg-slate-50 p-3">
                  <div className="text-sm font-semibold text-slate-900">
                    {log.time} · {log.message}
                  </div>
                  {log.data && (
                    <pre className="mt-2 max-h-40 overflow-auto rounded-xl bg-white p-3 text-xs text-slate-600">
                      {JSON.stringify(log.data, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Health rápido</h2>
          <button
            disabled={loading}
            onClick={() =>
              runStep("Health API", () =>
                apiFetch(endpoints.health.api, { auth: false }),
              )
            }
            className="mt-4 rounded-xl border px-4 py-3 font-semibold disabled:opacity-50"
          >
            Probar /health
          </button>
        </div>
      </div>
    </div>
  );
}
