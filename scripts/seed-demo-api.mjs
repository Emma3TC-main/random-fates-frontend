const API_URL =
  process.env.REACT_APP_API_URL ||
  process.env.API_URL ||
  "http://localhost:3000/v1";
const email = process.env.SEED_EMAIL || "demo@randomfates.test";
const password = process.env.SEED_PASSWORD || "Password123";
const shouldExecute = String(process.env.SEED_EXECUTE || "false").toLowerCase() === "true";
const raffleType = process.env.SEED_RAFFLE_TYPE || "ROULETTE";
const animationByType = { ROULETTE: "roulette", RANDOM_PICKER: "random", SLOT: "slots" };

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.success === false) {
    throw new Error(
      `${options.method || "GET"} ${endpoint} -> ${response.status}: ${payload?.message || "Error"}`,
    );
  }
  return payload.data;
};

const main = async () => {
  console.log(`API: ${API_URL}`);
  console.log(`Email demo: ${email}`);

  let auth;
  try {
    auth = await request("/auth/register", {
      method: "POST",
      body: { email, password },
    });
  } catch {
    auth = await request("/auth/login", {
      method: "POST",
      body: { email, password },
    });
  }

  const token = auth.tokens.accessToken;

  const raffle = await request("/raffles", {
    method: "POST",
    token,
    body: {
      title: `Sorteo seed ${raffleType} ${new Date().toISOString()}`,
      description: "Data demo creada por script API sin tocar backend",
      type: raffleType,
      isPublic: true,
      configuration: {
        winnersCount: 1,
        animation: animationByType[raffleType] || "roulette",
        allowDuplicates: false,
        rules: ["Un participante por identificador", "Hash verificable"],
      },
    },
  });

  await request(`/raffles/${raffle.id}/prizes`, {
    method: "POST",
    token,
    body: { name: "Gift Card S/100", description: "Premio demo", quantity: 1 },
  });

  await request(`/raffles/${raffle.id}/participants/bulk`, {
    method: "POST",
    token,
    body: {
      filename: "seed-demo-api.json",
      participants: [
        {
          fullName: "Ana Torres",
          identifier: "SEED-001",
          email: "ana@test.com",
          source: "API",
        },
        {
          fullName: "Luis Rojas",
          identifier: "SEED-002",
          email: "luis@test.com",
          source: "API",
        },
        {
          fullName: "María Pérez",
          identifier: "SEED-003",
          email: "maria@test.com",
          source: "API",
        },
        {
          fullName: "Carlos Sánchez",
          identifier: "SEED-004",
          email: "carlos@test.com",
          source: "API",
        },
      ],
    },
  });

  const published = await request(`/raffles/${raffle.id}/publish`, {
    method: "POST",
    token,
  });

  let execution = null;
  if (shouldExecute) {
    execution = await request(`/raffles/${raffle.id}/executions`, {
      method: "POST",
      token,
      body: {},
    });
  }

  console.log("\nSeed creado correctamente");
  console.log({
    email,
    password,
    raffleType,
    raffleId: raffle.id,
    publicToken: published.publicToken,
    state: shouldExecute ? "FINISHED" : "ACTIVE",
    executionId: execution?.id,
    resultId: execution?.result?.id,
    verificationHash: execution?.result?.verificationHash,
    winner: execution?.result?.winners?.[0]?.participant?.fullName,
    nextStep: shouldExecute
      ? "Abre la URL pública de verificación"
      : `Abre /games/${raffleType === "SLOT" ? "slots" : raffleType === "RANDOM_PICKER" ? "random-selection" : "roulette"}?raffleId=${raffle.id} para ejecutar desde frontend`,
  });
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
