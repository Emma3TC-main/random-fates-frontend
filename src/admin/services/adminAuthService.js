import { getAuthUser, isAdminUser, loginUser, logoutUser } from "../../services/authService";

export async function loginAdmin(email, password) {
  const result = await loginUser(email, password);

  // If the backend requires OTP, propagate that response so caller can handle redirection.
  if (result?.requiresOtp) {
    sessionStorage.setItem("auth_challenge_token", result.challengeToken);
    sessionStorage.setItem("auth_pending_email", email);
    if (result.expiresInSeconds) sessionStorage.setItem("auth_otp_expires", String(result.expiresInSeconds));
    if (result.delivery) sessionStorage.setItem("auth_otp_delivery", JSON.stringify(result.delivery));
    return result;
  }

  if (result.user?.role !== "ADMIN") {
    await logoutUser();
    return {
      success: false,
      message:
        "El usuario existe, pero no tiene rol ADMIN. Promuévelo en Supabase antes de entrar al panel.",
    };
  }

  return { success: true, user: result.user, tokens: result.tokens };
}

export async function logoutAdmin() {
  await logoutUser();
}

export function isAdminAuthenticated() {
  return Boolean(getAuthUser() && isAdminUser());
}
