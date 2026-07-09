import { apiFetch, getData, tokenStore } from "../api/client";
import { endpoints } from "../api/endpoints";

const OTP_SESSION_KEYS = [
  "auth_challenge_token",
  "auth_pending_email",
  "auth_otp_expires",
  "auth_otp_delivery",
  "auth_otp_context",
  "auth_otp_success_redirect",
  "auth_otp_failure_redirect",
];

export const clearPendingOtp = () => {
  OTP_SESSION_KEYS.forEach((key) => sessionStorage.removeItem(key));
};

export const savePendingOtp = ({
  challengeToken,
  email,
  expiresInSeconds,
  delivery,
  context = "user",
  successRedirect = "/dashboard",
  failureRedirect = "/login",
}) => {
  clearPendingOtp();

  sessionStorage.setItem("auth_challenge_token", challengeToken);
  sessionStorage.setItem("auth_pending_email", email);
  sessionStorage.setItem("auth_otp_context", context);
  sessionStorage.setItem("auth_otp_success_redirect", successRedirect);
  sessionStorage.setItem("auth_otp_failure_redirect", failureRedirect);

  if (expiresInSeconds) {
    sessionStorage.setItem("auth_otp_expires", String(expiresInSeconds));
  }

  if (delivery) {
    sessionStorage.setItem("auth_otp_delivery", JSON.stringify(delivery));
  }
};

const decodeJwtPayload = (token) => {
  try {
    if (!token) return null;

    const payload = token.split(".")[1];
    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );

    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

export const getAccessTokenPayload = () => {
  return decodeJwtPayload(tokenStore.getAccessToken());
};

export const hasRecentMfa = (maxAgeMinutes = 15) => {
  const payload = getAccessTokenPayload();
  const mfaVerifiedAt = payload?.mfaVerifiedAt;

  if (!mfaVerifiedAt) return false;

  const verifiedAtMs = Date.parse(mfaVerifiedAt);
  if (!Number.isFinite(verifiedAtMs)) return false;

  return Date.now() - verifiedAtMs <= maxAgeMinutes * 60 * 1000;
};

export const registerUser = async ({ email, password }) => {
  const data = await getData(endpoints.auth.register, {
    method: "POST",
    auth: false,
    body: { email, password },
  });

  tokenStore.setSession(data);
  return { success: true, user: data.user, tokens: data.tokens };
};

export const loginUser = async (email, password) => {
  const data = await getData(endpoints.auth.login, {
    method: "POST",
    auth: false,
    body: { email, password },
  });

  // If the backend requires OTP, do not create a session yet.
  if (data?.requiresOtp) {
    return data;
  }

  // Otherwise backend returned tokens -> set session as before
  tokenStore.setSession(data);
  return { success: true, user: data.user, tokens: data.tokens };
};

export const verifyOtp = async (challengeToken, otp) => {
  const data = await getData(endpoints.auth.otp.verify, {
    method: "POST",
    auth: false,
    body: { challengeToken, otp },
  });

  // Successful verification returns user + tokens
  tokenStore.setSession(data);
  return { success: true, user: data.user, tokens: data.tokens };
};

export const resendOtp = async (challengeToken) => {
  const data = await getData(endpoints.auth.otp.resend, {
    method: "POST",
    auth: false,
    body: { challengeToken },
  });

  return data;
};

export const refreshSession = async () => {
  const refreshToken = tokenStore.getRefreshToken();
  if (!refreshToken) return null;

  const data = await getData(endpoints.auth.refresh, {
    method: "POST",
    auth: false,
    body: { refreshToken },
  });

  tokenStore.setSession(data);
  return data;
};

export const logoutUser = async () => {
  const refreshToken = tokenStore.getRefreshToken();

  try {
    if (tokenStore.getAccessToken()) {
      await apiFetch(endpoints.auth.logout, {
        method: "POST",
        body: { refreshToken },
      });
    }
  } finally {
    tokenStore.clearSession();
  }
};

export const getAuthUser = () => tokenStore.getUser();

export const syncAuthUser = async () => {
  const user = await getData(endpoints.auth.me);
  tokenStore.setSession({ user, tokens: {} });
  return user;
};

export const updateProfile = async (payload) => {
  const user = await getData(endpoints.auth.updateMe, {
    method: "PATCH",
    body: payload,
  });
  tokenStore.setSession({ user, tokens: {} });
  return user;
};

export const isAuthenticated = () => Boolean(tokenStore.getAccessToken());
export const isAdminUser = () => getAuthUser()?.role === "ADMIN";
