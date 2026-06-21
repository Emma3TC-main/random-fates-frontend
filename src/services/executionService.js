import { getData } from "../api/client";
import { endpoints } from "../api/endpoints";

export const executionService = {
  execute(raffleId) {
    return getData(endpoints.executions.create(raffleId), {
      method: "POST",
      body: {},
    });
  },

  listByRaffle(raffleId, params = { page: 1, limit: 20 }) {
    return getData(endpoints.executions.list(raffleId, params));
  },

  getById(executionId) {
    return getData(endpoints.executions.detail(executionId));
  },
};
