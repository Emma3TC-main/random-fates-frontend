import { getData } from "../api/client";
import { endpoints } from "../api/endpoints";

const safeFeatures = (plan) => plan?.features || {};

export const formatPlanPrice = (plan) => {
  const price = Number(plan?.price || 0);
  if (price <= 0) return "$0";
  return `$${price.toFixed(price % 1 === 0 ? 0 : 2)}`;
};

export const getPlanMonths = (plan) => {
  const months = Number(safeFeatures(plan).billingPeriodMonths || 0);
  return Number.isFinite(months) ? months : 0;
};

export const getPlanTier = (plan) =>
  safeFeatures(plan).tier ||
  (Number(plan?.price || 0) > 0 ? "PREMIUM" : "FREE");

export const billingService = {
  listPlans() {
    return getData(endpoints.billing.plans, { auth: false });
  },

  getAccount() {
    return getData(endpoints.billing.account);
  },

  getPayments() {
    return getData(endpoints.billing.payments);
  },

  createPaypalOrder(planId) {
    return getData(endpoints.billing.paypalCreateOrder, {
      method: "POST",
      body: {
        planId,
        successPath: "/billing/success",
        cancelPath: "/billing/cancel",
      },
    });
  },

  capturePaypalOrder(orderId) {
    return getData(endpoints.billing.paypalCaptureOrder, {
      method: "POST",
      body: { orderId },
    });
  },

  cancelSubscription() {
    return getData(endpoints.billing.cancelSubscription, { method: "POST" });
  },
};
