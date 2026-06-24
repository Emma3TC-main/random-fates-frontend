import { useState } from "react";
import { executionService } from "../services/executionService";

const mapWinnerForUi = (winner) => ({
  ...winner,
  id: winner.participant?.id,
  name: winner.participant?.fullName,
  fullName: winner.participant?.fullName,
  identifier: winner.participant?.identifier,
  prizeName: winner.prize?.name,
});

export default function useBackendExecution(raffleId) {
  const [executing, setExecuting] = useState(false);
  const [execution, setExecution] = useState(null);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  const execute = async () => {
    if (!raffleId) return null;

    setExecuting(true);
    setError(null);
    setWinner(null);

    try {
      const data = await executionService.execute(raffleId);
      const firstWinner = data?.result?.winners?.[0]
        ? mapWinnerForUi(data.result.winners[0])
        : null;

      setExecution(data);
      setWinner(firstWinner);
      if (firstWinner) setHistory((prev) => [firstWinner, ...prev]);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setExecuting(false);
    }
  };

  return {
    executing,
    execution,
    winner,
    history,
    error,
    execute,
    setWinner,
  };
}
