import { toQueryString } from "./client";

export const endpoints = {
  health: {
    api: "/health",
    db: "/health/db",
  },

  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    me: "/auth/me",
  },

  raffles: {
    list: (params = {}) => `/raffles${toQueryString(params, { maxLimit: 100 })}`,
    create: "/raffles",
    detail: (raffleId) => `/raffles/${raffleId}`,
    update: (raffleId) => `/raffles/${raffleId}`,
    publish: (raffleId) => `/raffles/${raffleId}/publish`,
    cancel: (raffleId) => `/raffles/${raffleId}/cancel`,
    remove: (raffleId) => `/raffles/${raffleId}`,
    publicDetail: (publicToken) => `/public/raffles/${publicToken}`,
  },

  participants: {
    list: (raffleId, params = {}) => `/raffles/${raffleId}/participants${toQueryString(params, { maxLimit: 200 })}`,
    create: (raffleId) => `/raffles/${raffleId}/participants`,
    bulk: (raffleId) => `/raffles/${raffleId}/participants/bulk`,
    remove: (raffleId, participantId) => `/raffles/${raffleId}/participants/${participantId}`,
  },

  prizes: {
    list: (raffleId, params = {}) => `/raffles/${raffleId}/prizes${toQueryString(params, { maxLimit: 100 })}`,
    create: (raffleId) => `/raffles/${raffleId}/prizes`,
    remove: (raffleId, prizeId) => `/raffles/${raffleId}/prizes/${prizeId}`,
  },

  executions: {
    create: (raffleId) => `/raffles/${raffleId}/executions`,
    list: (raffleId, params = {}) => `/raffles/${raffleId}/executions${toQueryString(params, { maxLimit: 100 })}`,
    detail: (executionId) => `/executions/${executionId}`,
  },

  results: {
    detail: (resultId) => `/results/${resultId}`,
    publicByHash: (verificationHash) => `/public/results/${verificationHash}`,
    verify: (verificationHash) => `/public/results/${verificationHash}/verify`,
  },

  billing: {
    plans: "/billing/plans",
    subscribe: "/billing/subscribe",
    subscription: "/billing/subscription",
  },

  admin: {
    kpis: "/admin/kpis",
    auditLogs: (params = {}) => `/admin/audit-logs${toQueryString(params, { maxLimit: 100 })}`,
    users: (params = {}) => `/users${toQueryString(params, { maxLimit: 100 })}`,
  },
};
