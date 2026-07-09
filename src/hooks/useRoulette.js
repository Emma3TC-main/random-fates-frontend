import { useState, useRef, useEffect } from "react";
import { randomWinner } from "../utils/randomWinner";
import { getWinnerFromExecution } from "../utils/randomFatesFormat";

export default function useRoulette(participants, options = {}) {
  const { executeBackend, onExecutionComplete } = options;
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [duration, setDuration] = useState(5000);
  const [rotation, setRotation] = useState(0);
  const [execution, setExecution] = useState(null);
  const [error, setError] = useState(null);
  const [waitingForResult, setWaitingForResult] = useState(false);
  const [frozenParticipants, setFrozenParticipants] = useState([]);
  const timeoutRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const rotateToWinner = (selectedWinner) => {
    const winnerIndex = Math.max(
      0,
      participants.findIndex((p) => p.id === selectedWinner.id),
    );
    const segmentAngle =
      participants.length > 0 ? 360 / participants.length : 360;
    const targetAngle = winnerIndex * segmentAngle;
    const extraSpins = 360 * 6;

    rafRef.current = requestAnimationFrame(() => {
      setRotation((prevRotation) => {
        const currentRotation = ((prevRotation % 360) + 360) % 360;
        const correction =
          (360 - ((currentRotation + targetAngle) % 360)) % 360;
        return prevRotation + extraSpins + correction;
      });
    });
  };

  const startRoulette = async () => {
    if (participants.length === 0 || spinning) return;

    setSpinning(true);
    setWaitingForResult(true);
    setWinner(null);
    setError(null);
    setFrozenParticipants(participants.slice());

    try {
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

      setWaitingForResult(false);
      if (!selectedWinner) throw new Error("No se pudo obtener un ganador.");
      rotateToWinner(selectedWinner);

      timeoutRef.current = setTimeout(() => {
        setWinner(selectedWinner);
        setHistory((prev) => [selectedWinner, ...prev]);
        setSpinning(false);
        timeoutRef.current = null;
        if (executeBackend && typeof onExecutionComplete === "function") {
          onExecutionComplete(executionData);
        }
      }, duration);
    } catch (err) {
      setError(err);
      setWaitingForResult(false);
      setSpinning(false);
      return null;
    }
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
    execution,
    error,
    waitingForResult,
    frozenParticipants,
  };
}
