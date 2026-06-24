import { registerUser, loginUser, getAuthUser } from "./authService";
import { raffleService } from "./raffleService";
import { prizeService } from "./prizeService";
import { participantService } from "./participantService";

export const demoSeed = {
  email: "demo@randomfates.test",
  password: "Password123",
  participants: [
    { fullName: "Ana Torres", identifier: "DNI-001", email: "ana@test.com", source: "MANUAL" },
    { fullName: "Luis Rojas", identifier: "DNI-002", email: "luis@test.com", source: "MANUAL" },
    { fullName: "María Pérez", identifier: "DNI-003", email: "maria@test.com", source: "MANUAL" },
    { fullName: "Carlos Sánchez", identifier: "DNI-004", email: "carlos@test.com", source: "MANUAL" },
  ],
};

export async function ensureDemoAuth(email = demoSeed.email, password = demoSeed.password) {
  try {
    await registerUser({ email, password });
  } catch (_error) {
    await loginUser(email, password);
  }
  return getAuthUser();
}

export async function createPlayableDemoRaffle(type = "ROULETTE") {
  const suffix = new Date().toLocaleTimeString("es-PE");
  const raffle = await raffleService.create({
    title: `Demo jugable ${suffix}`,
    description: "Sorteo demo activo para probar minijuegos con sistema activo",
    type,
    isPublic: true,
    configuration: {
      winnersCount: 1,
      animation: type === "SLOT" ? "slots" : type === "RANDOM_PICKER" ? "random" : "roulette",
      allowDuplicates: false,
      rules: ["Un participante por identificador", "Resultado verificable por hash"],
    },
  });

  await prizeService.create(raffle.id, {
    name: "Gift Card S/100",
    description: "Premio demo para prueba integrada",
    quantity: 1,
  });

  await participantService.bulk(raffle.id, demoSeed.participants, "frontend-demo.json");
  return raffleService.publish(raffle.id);
}
