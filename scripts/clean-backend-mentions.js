// clean-backend-mentions.js

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "src");

const replacements = [
  ["Backend conectado", "Sistema operativo"],
  ["BACKEND REAL", "SISTEMA ACTIVO"],
  ["backend real", "sistema activo"],
  ["ejecutado por backend", "ejecutado"],
  ["conectados al backend", "disponibles"],
  ["conectada al backend", "operativa"],
  ["consume los endpoints del backend", "consume los servicios del sistema"],
  ["Conecta con el backend de RandomFates", "Accede a RandomFates"],
  [
    "Roles USER, ADMIN y permisos desde backend",
    "Roles y permisos del sistema",
  ],
  ["El backend no devolvió ganador", "No se pudo obtener un ganador"],
  [
    "Sorteos reales administrados desde el backend",
    "Sorteos administrados por la plataforma",
  ],
  [
    "La animación recorre nombres, pero el ganador final es persistido por el backend",
    "La animación recorre nombres y muestra el resultado final registrado por el sistema",
  ],
  [
    "La ruleta anima la selección, pero el ganador real se obtiene de POST /raffles/:id/executions",
    "La ruleta anima la selección y muestra el resultado oficial",
  ],
  [
    "El slot muestra el efecto visual; el ganador, premio y hash vienen del backend",
    "El slot muestra el efecto visual y el resultado registrado",
  ],
  ["Gestión conectada al backend", "Gestión operativa"],
  ["firmado por el backend", "validado por el sistema"],
  ["El backend es la fuente", "El sistema es la fuente"],
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
      continue;
    }

    if (!/\.(js|jsx|ts|tsx)$/.test(file)) continue;

    let content = fs.readFileSync(fullPath, "utf8");
    let modified = false;

    for (const [from, to] of replacements) {
      if (content.includes(from)) {
        content = content.split(from).join(to);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(fullPath, content, "utf8");
      console.log("✓", fullPath);
    }
  }
}

processDirectory(ROOT);

console.log("\nLimpieza completada.");
