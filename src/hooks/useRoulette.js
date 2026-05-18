import { useState } from "react";

import { randomWinner } from "../utils/randomWinner";

export default function useRoulette(participants) {
  const [spinning, setSpinning] = useState(false);

  const [winner, setWinner] = useState(null);

  const [history, setHistory] = useState([]);

  const [duration, setDuration] = useState(5000);

  const [rotation, setRotation] = useState(0);

  const startRoulette = () => {
    if (participants.length === 0) return;

    setSpinning(true);

    setWinner(null);

    const selectedWinner = randomWinner(participants);

    const winnerIndex = participants.findIndex(
      (p) => p.id === selectedWinner.id,
    );

    const segmentAngle = 360 / participants.length;

    const targetAngle = winnerIndex * segmentAngle;

    const extraSpins = 360 * 6;

    // Calcula la rotación total necesaria para que la ruleta se detenga en el ganador, asegurando que gire al menos 6 veces para un efecto visual agradable.
    // La corrección se asegura de que la ruleta se detenga exactamente en el segmento del ganador, sin importar la rotación actual.
    setRotation((prevRotation) => {
      const currentRotation = ((prevRotation % 360) + 360) % 360;
      const correction = (360 - ((currentRotation + targetAngle) % 360)) % 360;
      return prevRotation + extraSpins + correction;
    });

    setTimeout(() => {
      setWinner(selectedWinner);

      setHistory((prev) => [selectedWinner, ...prev]);

      setSpinning(false);
    }, duration);
  };

  return {
    spinning,
    winner,
    history,
    duration,
    setDuration,
    startRoulette,
    setWinner,
    rotation,
  };
}
