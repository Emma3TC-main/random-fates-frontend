import { toQueryString } from "./client";

const ADMIN_API_SEGMENT = (
  process.env.REACT_APP_ADMIN_API_SEGMENT || "/ops"
).replace(/\/+$/, "");

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
    updateMe: "/users/me",
    otp: {
      verify: "/auth/otp/verify",
      resend: "/auth/otp/resend",
    },
  },

  raffles: {
    list: (params = {}) =>
      `/raffles${toQueryString(params, { maxLimit: 100 })}`,
    create: "/raffles",
    detail: (raffleId) => `/raffles/${raffleId}`,
    update: (raffleId) => `/raffles/${raffleId}`,
    publish: (raffleId) => `/raffles/${raffleId}/publish`,
    cancel: (raffleId) => `/raffles/${raffleId}/cancel`,
    remove: (raffleId) => `/raffles/${raffleId}`,
    publicDetail: (publicToken) => `/public/raffles/${publicToken}`,
  },

  participants: {
    list: (raffleId, params = {}) =>
      `/raffles/${raffleId}/participants${toQueryString(params, { maxLimit: 200 })}`,
    create: (raffleId) => `/raffles/${raffleId}/participants`,
    bulk: (raffleId) => `/raffles/${raffleId}/participants/bulk`,
    remove: (raffleId, participantId) =>
      `/raffles/${raffleId}/participants/${participantId}`,
  },

  prizes: {
    list: (raffleId, params = {}) =>
      `/raffles/${raffleId}/prizes${toQueryString(params, { maxLimit: 100 })}`,
    create: (raffleId) => `/raffles/${raffleId}/prizes`,
    remove: (raffleId, prizeId) => `/raffles/${raffleId}/prizes/${prizeId}`,
  },

  executions: {
    create: (raffleId) => `/raffles/${raffleId}/executions`,
    list: (raffleId, params = {}) =>
      `/raffles/${raffleId}/executions${toQueryString(params, { maxLimit: 100 })}`,
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
    account: "/billing/account",
    payments: "/billing/payments",
    paypalCreateOrder: "/billing/paypal/create-order",
    paypalCaptureOrder: "/billing/paypal/capture-order",
    cancelSubscription: "/billing/subscription/cancel",
  },

  admin: {
    kpis: `${ADMIN_API_SEGMENT}/kpis`,
    auditLogs: (params = {}) =>
      `${ADMIN_API_SEGMENT}/audit-logs${toQueryString(params, { maxLimit: 100 })}`,
    users: (params = {}) => `/users${toQueryString(params, { maxLimit: 100 })}`,
    updateUserStatus: (userId) => `/users/${userId}/status`,
  },
};
