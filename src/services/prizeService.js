import { getData } from "../api/client";
import { endpoints } from "../api/endpoints";

export const prizeService = {
  list(raffleId, params = { page: 1, limit: 50 }) {
    return getData(endpoints.prizes.list(raffleId, {
      ...params,
      page: Math.max(Number(params.page || 1), 1),
      limit: Math.min(Math.max(Number(params.limit || 50), 1), 100),
    }));
  },

  create(raffleId, prize) {
    return getData(endpoints.prizes.create(raffleId), {
      method: "POST",
      body: {
        name: prize.name,
        description: prize.description || undefined,
        quantity: Number(prize.quantity || 1),
      },
    });
  },

  remove(raffleId, prizeId) {
    return getData(endpoints.prizes.remove(raffleId, prizeId), {
      method: "DELETE",
    });
  },
};
