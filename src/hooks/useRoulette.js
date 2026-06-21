import { useState } from "react";
import { randomWinner } from "../utils/randomWinner";
import { getWinnerFromExecution } from "../utils/randomFatesFormat";

export default function useRoulette(participants, options = {}) {
  const { executeBackend } = options;
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [duration, setDuration] = useState(5000);
  const [rotation, setRotation] = useState(0);
  const [execution, setExecution] = useState(null);
  const [error, setError] = useState(null);

  const rotateToWinner = (selectedWinner) => {
    const winnerIndex = Math.max(0, participants.findIndex((p) => p.id === selectedWinner.id));
    const segmentAngle = participants.length > 0 ? 360 / participants.length : 360;
    const targetAngle = winnerIndex * segmentAngle;
    const extraSpins = 360 * 6;

    setRotation((prevRotation) => {
      const currentRotation = ((prevRotation % 360) + 360) % 360;
      const correction = (360 - ((currentRotation + targetAngle) % 360)) % 360;
      return prevRotation + extraSpins + correction;
    });
  };

  const startRoulette = async () => {
    if (participants.length === 0 || spinning) return;

    setSpinning(true);
    setWinner(null);
    setError(null);

    try {
      let selectedWinner;
      let executionData = null;

      if (executeBackend) {
        executionData = await executeBackend();
        selectedWinner = getWinnerFromExecution(executionData);
        setExecution(executionData);
      } else {
        selectedWinner = randomWinner(participants);
      }

      if (!selectedWinner) throw new Error("No se pudo obtener un ganador.");
      rotateToWinner(selectedWinner);

      setTimeout(() => {
        setWinner(selectedWinner);
        setHistory((prev) => [selectedWinner, ...prev]);
        setSpinning(false);
      }, duration);
    } catch (err) {
      setError(err);
      setSpinning(false);
      return null;
    }
  };

  return { spinning, winner, history, duration, setDuration, startRoulette, setWinner, rotation, execution, error };
}
