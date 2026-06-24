import { useEffect, useState } from "react";
import { participantService } from "../services/participantService";

const mapForGame = (participant) => ({
  ...participant,
  name: participant.fullName || participant.name,
});

export default function useParticipants(raffleId) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        setError(null);

        if (raffleId) {
          const data = await participantService.list(raffleId, {
            page: 1,
            limit: 200,
          });
          setParticipants((data || []).map(mapForGame));
          return;
        }

        // Fallback para que los juegos actuales sigan funcionando sin backend.
        const response = await fetch("/participants.json");
        const data = await response.json();
        setParticipants(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [raffleId]);

  return { participants, loading, error };
}
