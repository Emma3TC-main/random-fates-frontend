import { useEffect, useState } from "react";

export default function useParticipants() {
  const [participants, setParticipants] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch("/participants.json");

        const data = await response.json();

        setParticipants(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  return {
    participants,
    loading,
  };
}
