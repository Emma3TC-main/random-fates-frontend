import userData from "../data/user.json";

/* Obtener usuarios actualizados */
export const getUsers = () => {
  try {
    const users = localStorage.getItem("users");

    // Si ya existen usuarios en localStorage, los usamos
    if (users) {
      return JSON.parse(users);
    }

    // Si es la primera vez y está vacío, inicializamos con el JSON
    localStorage.setItem("users", JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return userData;
  }
};

/* Login */
export const loginUser = (usuario, password) => {
  const users = getUsers();

  // Buscamos coincidencia exacta de usuario y contraseña (ambos como strings)
  const user = users.find(
    (u) => u.usuario === usuario && String(u.password) === String(password),
  );

  if (user) {
    localStorage.setItem("authUser", JSON.stringify(user));
    return user;
  }

  return null;
};

/* Register */
export const registerUser = (newUser) => {
  const users = getUsers();

  const userExists = users.some(
    (u) =>
      u.usuario.toLowerCase() === newUser.usuario.toLowerCase() ||
      u.email.toLowerCase() === newUser.email.toLowerCase(),
  );

  if (userExists) {
    return {
      success: false,
      message: "El usuario o correo ya existe",
    };
  }

  const updatedUsers = [
    ...users,
    {
      id: Date.now(),
      ...newUser,
    },
  ];

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // Auto-loguear al usuario recién registrado
  localStorage.setItem(
    "authUser",
    JSON.stringify(updatedUsers[updatedUsers.length - 1]),
  );

  return {
    success: true,
    message: "Usuario registrado exitosamente",
  };
};

/* Logout */
export const logoutUser = () => {
  localStorage.removeItem("authUser");
};

/* User Actual */
export const getAuthUser = () => {
  const user = localStorage.getItem("authUser");
  return user ? JSON.parse(user) : null;
};
