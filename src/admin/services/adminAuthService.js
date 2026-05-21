const ADMIN_TOKEN_KEY = "admin_token";

export function loginAdmin(email, password) {
  if (email === "admin@randomfates.com" && password === "admin123") {
    const fakeToken = "rf_admin_token";

    localStorage.setItem(ADMIN_TOKEN_KEY, fakeToken);

    return {
      success: true,
      token: fakeToken,
    };
  }

  return {
    success: false,
    message: "Credenciales inválidas",
  };
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function isAdminAuthenticated() {
  return !!localStorage.getItem(ADMIN_TOKEN_KEY);
}
