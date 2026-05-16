import {  useState } from "react";

import { randomWinner } from "../utils/randomWinner";

export default function useRandomSelection(participants) {
  const [animating, setAnimating] = useState(false);

  const [currentName, setCurrentName] = useState("?");

  const [winner, setWinner] = useState(null);

  const [history, setHistory] = useState([]);

  const [duration, setDuration] = useState(3000);

  const startSelection = () => {
    if (participants.length === 0) return;

    setAnimating(true);

    setWinner(null);

    const interval = setInterval(() => {
      const randomParticipant =
        participants[Math.floor(Math.random() * participants.length)];

      setCurrentName(randomParticipant.name);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);

      const selectedWinner = randomWinner(participants);

      setCurrentName(selectedWinner.name);

      setWinner(selectedWinner);

      setHistory((prev) => [selectedWinner, ...prev]);

      setAnimating(false);
    }, duration);
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
  };
}
