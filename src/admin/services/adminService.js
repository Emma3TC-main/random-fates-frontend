import { getData } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { raffleService } from "../../services/raffleService";

export const adminService = {
  getKpis() {
    return getData(endpoints.admin.kpis);
  },

  getUsers(params = { page: 1, limit: 50 }) {
    return getData(endpoints.admin.users(params));
  },

  getRaffles(params = { page: 1, limit: 100 }) {
    return raffleService.list(params);
  },

  getAuditLogs(params = { page: 1, limit: 20 }) {
    return getData(endpoints.admin.auditLogs(params));
  },
};
