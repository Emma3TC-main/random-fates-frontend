import userData from "../data/user";

/* Obtener usuarios */
export const getUsers = () => {
  const users = localStorage.getItem("users");

  if (users) {
    return JSON.parse(users);
  }

  localStorage.setItem("users", JSON.stringify(userData));

  return userData;
};

/* Login */
export const loginUser = (usuario, password) => {
  const users = getUsers();

  const user = users.find(
    (u) => u.usuario === usuario && u.password === password,
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
    (u) => u.usuario === newUser.usuario || u.email === newUser.email,
  );

  if (!userExists) {
    return {
      success: false,
      message: "El usuario o correo ya existe",
    };
  }

  const updatedUsers = [...users, { id: Date.now(), ...newUser }];

  localStorage.setItem("users", JSON.stringify(updatedUsers));

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
  return JSON.parse(localStorage.getItem("authUser"));
};
