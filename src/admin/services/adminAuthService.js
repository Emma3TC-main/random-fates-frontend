import { getAuthUser, isAdminUser, loginUser, logoutUser } from "../../services/authService";

export async function loginAdmin(email, password) {
  const result = await loginUser(email, password);

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
