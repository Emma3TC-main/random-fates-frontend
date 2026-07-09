import { secureRandomWinner } from "./secureRandom";

export function randomWinner(participants, options = {}) {
  return secureRandomWinner(participants, options);
}
