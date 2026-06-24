import { useState, useRef, useEffect } from "react";

import { randomWinner } from "../utils/randomWinner";

export default function useRoulette(participants) {
  const [spinning, setSpinning] = useState(false);

  const [winner, setWinner] = useState(null);

  const [history, setHistory] = useState([]);

  const [duration, setDuration] = useState(5000);

  const [rotation, setRotation] = useState(0);

  // Congela los participantes en el momento de iniciar la ruleta para evitar re-render
  // que cambie la distribución de segmentos durante la animación.
  const [frozenParticipants, setFrozenParticipants] = useState([]);

  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startRoulette = () => {
    if (participants.length === 0) return;

    setSpinning(true);

    setWinner(null);

    // Tomar snapshot de participantes para usar durante la animación
    setFrozenParticipants(participants.slice());

    const selectedWinner = randomWinner(participants);

    const winnerIndex = participants.findIndex((p) => p.id === selectedWinner.id);

    const segmentAngle = 360 / participants.length;

    const targetAngle = winnerIndex * segmentAngle;

    const extraSpins = 360 * 6;

    // Para asegurar que la transición CSS se aplique correctamente en todos los navegadores,
    // actualizamos la rotación en el siguiente frame visual.
    requestAnimationFrame(() => {
      setRotation((prevRotation) => {
        const currentRotation = ((prevRotation % 360) + 360) % 360;
        const correction = (360 - ((currentRotation + targetAngle) % 360)) % 360;
        return prevRotation + extraSpins + correction;
      });
    });

    // Guardar timeout para limpieza y control
    timeoutRef.current = setTimeout(() => {
      setWinner(selectedWinner);

      setHistory((prev) => [selectedWinner, ...prev]);

      setSpinning(false);
      timeoutRef.current = null;
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
    frozenParticipants,
  };
}
