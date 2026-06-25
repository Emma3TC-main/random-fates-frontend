// seed-admins.mjs

const API_URL =
  process.env.REACT_APP_API_URL ||
  process.env.API_URL ||
  "http://localhost:3000/v1";

const admins = [
  "admin@randomfates.test",
  "emma@randomfates.test",
  "misael@randomfates.test",
];

async function register(email) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password: "Password123",
    }),
  });

  const data = await response.json();

  console.log(email, response.status, data?.message);
}

(async () => {
  for (const email of admins) {
    await register(email);
  }

  console.log("Usuarios creados.");
})();