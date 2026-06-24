import { getData } from "../api/client";
import { endpoints } from "../api/endpoints";

const clampParticipantParams = (params = {}) => ({
  ...params,
  page: Math.max(Number(params.page || 1), 1),
  limit: Math.min(Math.max(Number(params.limit || 200), 1), 200),
});

const normalizeParticipant = (participant) => {
  const identifier = participant.identifier || participant.dni || participant.document || participant.email || participant.id;
  return {
    fullName: String(participant.fullName || participant.name || participant.nombre || "").trim(),
    identifier: String(identifier || "").trim(),
    email: participant.email ? String(participant.email).trim().toLowerCase() : undefined,
    source: participant.source || "MANUAL",
    metadata: participant.metadata || {},
  };
};

export const participantService = {
  list(raffleId, params = { page: 1, limit: 200 }) {
    return getData(endpoints.participants.list(raffleId, clampParticipantParams(params)));
  },

  create(raffleId, participant) {
    return getData(endpoints.participants.create(raffleId), {
      method: "POST",
      body: normalizeParticipant(participant),
    });
  },

  bulk(raffleId, participants, filename = "frontend-bulk.json") {
    return getData(endpoints.participants.bulk(raffleId), {
      method: "POST",
      body: {
        filename,
        participants: participants.map(normalizeParticipant).filter((participant) => participant.fullName && participant.identifier),
      },
    });
  },

  remove(raffleId, participantId) {
    return getData(endpoints.participants.remove(raffleId, participantId), {
      method: "DELETE",
    });
  },
};
