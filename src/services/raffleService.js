import { getData } from "../api/client";
import { endpoints } from "../api/endpoints";

export const raffleService = {
  list(params = { page: 1, limit: 20 }) {
    return getData(endpoints.raffles.list({
      ...params,
      page: Math.max(Number(params.page || 1), 1),
      limit: Math.min(Math.max(Number(params.limit || 20), 1), 100),
    }));
  },

  getById(raffleId) {
    return getData(endpoints.raffles.detail(raffleId));
  },

  create(payload) {
    return getData(endpoints.raffles.create, {
      method: "POST",
      body: {
        title: payload.title,
        description: payload.description || undefined,
        type: payload.type || "ROULETTE",
        configuration: payload.configuration || {
          winnersCount: 1,
          animation: "roulette",
          rules: ["Un participante solo puede ganar una vez"],
        },
        isPublic: payload.isPublic ?? true,
      },
    });
  },

  update(raffleId, payload) {
    return getData(endpoints.raffles.update(raffleId), {
      method: "PATCH",
      body: payload,
    });
  },

  publish(raffleId) {
    return getData(endpoints.raffles.publish(raffleId), { method: "POST" });
  },

  cancel(raffleId) {
    return getData(endpoints.raffles.cancel(raffleId), { method: "POST" });
  },

  remove(raffleId) {
    return getData(endpoints.raffles.remove(raffleId), { method: "DELETE" });
  },

  getPublic(publicToken) {
    return getData(endpoints.raffles.publicDetail(publicToken), { auth: false });
  },
};
