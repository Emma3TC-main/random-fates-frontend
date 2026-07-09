import { useState } from "react";
import { randomWinner } from "../utils/randomWinner";
import { getWinnerFromExecution } from "../utils/randomFatesFormat";

const slotIcons = ["🍒", "💎", "⭐", "🔥", "🎰", "⚡", "👑"];

export default function useSlots(participants, options = {}) {
  const { executeBackend } = options;
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [duration, setDuration] = useState(4000);
  const [reels, setReels] = useState(["🎰", "🎰", "🎰"]);
  const [execution, setExecution] = useState(null);
  const [error, setError] = useState(null);

  const startSlots = async () => {
    if (participants.length === 0 || spinning) return;

    setSpinning(true);
    setWinner(null);
    setError(null);

    const interval = setInterval(() => {
      setReels([
        slotIcons[Math.floor(Math.random() * slotIcons.length)],
        slotIcons[Math.floor(Math.random() * slotIcons.length)],
        slotIcons[Math.floor(Math.random() * slotIcons.length)],
      ]);
    }, 120);

    try {
      const startedAt = Date.now();
      let selectedWinner;
      let executionData = null;

      if (executeBackend) {
        executionData = await executeBackend();
        selectedWinner = getWinnerFromExecution(executionData);
        setExecution(executionData);
      } else {
        selectedWinner = randomWinner(participants, {
          avoidIds: history.slice(0, 1).map((item) => item.id),
        });
      }

      if (!selectedWinner) throw new Error("No se pudo obtener un ganador.");
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, duration - elapsed);

      setTimeout(() => {
        clearInterval(interval);
        setReels(["👑", "👑", "👑"]);
        setWinner(selectedWinner);
        setHistory((prev) => [selectedWinner, ...prev]);
        setSpinning(false);
      }, remaining);
    } catch (err) {
      clearInterval(interval);
      setError(err);
      setSpinning(false);
      return null;
    }
  };

  return {
    spinning,
    winner,
    history,
    duration,
    reels,
    setDuration,
    startSlots,
    setWinner,
    execution,
    error,
  };
}
