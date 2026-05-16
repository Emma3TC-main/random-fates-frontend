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

    setRotation((prevRotation) => {
      return prevRotation + extraSpins + (360 - targetAngle);
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
