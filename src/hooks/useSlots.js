import { useState } from "react";

import { randomWinner } from "../utils/randomWinner";

const slotIcons = ["🍒", "💎", "⭐", "🔥", "🎰", "⚡", "👑"];

export default function useSlots(participants) {
  const [spinning, setSpinning] = useState(false);

  const [winner, setWinner] = useState(null);

  const [history, setHistory] = useState([]);

  const [duration, setDuration] = useState(4000);

  const [reels, setReels] = useState(["🎰", "🎰", "🎰"]);

  const startSlots = () => {
    if (participants.length === 0) return;

    setSpinning(true);

    setWinner(null);

    const interval = setInterval(() => {
      setReels([
        slotIcons[Math.floor(Math.random() * slotIcons.length)],
        slotIcons[Math.floor(Math.random() * slotIcons.length)],
        slotIcons[Math.floor(Math.random() * slotIcons.length)],
      ]);
    }, 120);

    setTimeout(() => {
      clearInterval(interval);

      setReels(["👑", "👑", "👑"]);

      const selectedWinner = randomWinner(participants);

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
    reels,
    setDuration,
    startSlots,
    setWinner,
  };
}
