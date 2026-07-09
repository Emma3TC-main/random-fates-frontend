import { useState } from "react";
import { randomWinner } from "../utils/randomWinner";
import { getWinnerFromExecution } from "../utils/randomFatesFormat";

export default function useRandomSelection(participants, options = {}) {
  const { executeBackend } = options;
  const [animating, setAnimating] = useState(false);
  const [currentName, setCurrentName] = useState("?");
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [duration, setDuration] = useState(3000);
  const [execution, setExecution] = useState(null);
  const [error, setError] = useState(null);

  const startSelection = async () => {
    if (participants.length === 0 || animating) return;

    setAnimating(true);
    setWinner(null);
    setError(null);

    const interval = setInterval(() => {
      const randomParticipant =
        participants[Math.floor(Math.random() * participants.length)];
      setCurrentName(randomParticipant.name || randomParticipant.fullName);
    }, 100);

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
        setCurrentName(selectedWinner.name);
        setWinner(selectedWinner);
        setHistory((prev) => [selectedWinner, ...prev]);
        setAnimating(false);
      }, remaining);
    } catch (err) {
      clearInterval(interval);
      setError(err);
      setAnimating(false);
      return null;
    }
  };

  return {
    animating,
    currentName,
    winner,
    history,
    duration,
    setDuration,
    startSelection,
    setWinner,
    execution,
    error,
  };
}
