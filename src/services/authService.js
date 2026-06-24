import { apiFetch, getData, tokenStore } from "../api/client";
import { endpoints } from "../api/endpoints";

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

export const isAuthenticated = () => Boolean(tokenStore.getAccessToken());
export const isAdminUser = () => getAuthUser()?.role === "ADMIN";
