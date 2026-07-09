import {
  getAuthUser,
  hasRecentMfa,
  isAdminUser,
  loginUser,
  logoutUser,
  savePendingOtp,
} from "../../services/authService";
import { adminPath } from "../../config/routes";

export async function loginAdmin(email, password) {
  const result = await loginUser(email, password);

  // If the backend requires OTP, propagate that response so caller can handle redirection.
  if (result?.requiresOtp) {
    if (result.user?.role !== "ADMIN") {
      return {
        success: false,
        message:
          "El usuario existe, pero no tiene rol ADMIN. Promuévelo en Supabase antes de entrar al panel.",
      };
    }

    savePendingOtp({
      challengeToken: result.challengeToken,
      email: email.trim(),
      expiresInSeconds: result.expiresInSeconds,
      delivery: result.delivery,
      context: "admin",
      successRedirect: adminPath("/dashboard"),
      failureRedirect: adminPath("/login"),
    });

    return {
      ...result,
      success: true,
    };
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
  return Boolean(getAuthUser() && isAdminUser() && hasRecentMfa(15));
}

export function isAdminLoggedWithoutRecentMfa() {
  return Boolean(getAuthUser() && isAdminUser() && !hasRecentMfa(15));
}
