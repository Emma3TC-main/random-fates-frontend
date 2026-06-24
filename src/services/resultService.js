import { getData } from "../api/client";
import { endpoints } from "../api/endpoints";

export const resultService = {
  getById(resultId) {
    return getData(endpoints.results.detail(resultId));
  },

  getPublicByHash(verificationHash) {
    return getData(endpoints.results.publicByHash(verificationHash), { auth: false });
  },

  verify(verificationHash) {
    return getData(endpoints.results.verify(verificationHash), { auth: false });
  },
};
