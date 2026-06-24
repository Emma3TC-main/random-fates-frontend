import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { raffleService } from "../services/raffleService";
import { participantService } from "../services/participantService";
import { labelType } from "../utils/randomFatesFormat";

const mapParticipant = (participant) => ({
  ...participant,
  name: participant.fullName || participant.name || participant.identifier,
});

export default function useGameRaffle(preferredType = "ROULETTE") {
  const [searchParams] = useSearchParams();
  const raffleId = searchParams.get("raffleId");
  const [raffle, setRaffle] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [availableRaffles, setAvailableRaffles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const list = await raffleService.list({ page: 1, limit: 100 });
      const items = Array.isArray(list) ? list : [];
      const playable = items.filter((item) => item.state === "ACTIVE" && item.type === preferredType);
      setAvailableRaffles(playable);

      const selected = raffleId
        ? await raffleService.getById(raffleId)
        : playable[0] || null;

      if (selected && selected.type !== preferredType) {
        throw new Error(`El sorteo seleccionado es de tipo ${labelType(selected.type)}, pero este minijuego espera ${labelType(preferredType)}.`);
      }

      setRaffle(selected);

      if (selected?.id) {
        const data = await participantService.list(selected.id, { page: 1, limit: 200 });
        setParticipants((data || []).map(mapParticipant));
      } else {
        setParticipants([]);
      }
    } catch (err) {
      setError(err);
      setParticipants([]);
      setRaffle(null);
    } finally {
      setLoading(false);
    }
  }, [raffleId, preferredType]);

  useEffect(() => {
    load();
  }, [load]);

  const canExecute = useMemo(
    () => Boolean(raffle?.id && raffle.state === "ACTIVE" && participants.length > 0),
    [raffle, participants.length],
  );

  return { raffle, participants, availableRaffles, loading, error, canExecute, refresh: load };
}
