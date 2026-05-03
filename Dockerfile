# Etapa 1: build (compilación)
# Usamos una imagen ligera de Node.js
FROM node:20-alpine as builder

# "as builder" permite un multi-stage build para reducir el tamaño final de la imagen
WORKDIR /app

# Define el directorio de trabajo dentro del contenedor
# Copiamos solo package.json y package-lock.json primero
COPY package*.json ./

# Esto optimiza la caché de Docker: si las dependencias no cambian, 
# Docker saltará este paso en la próxima construcción.
RUN npm install

# Ahora copiamos TODO el resto del proyecto
COPY . .

# Generamos el build de producción (En React/CRA suele ser la carpeta /build)
RUN npm run build


# Etapa 2: producción (El servidor real)
# Usamos Nginx, un servidor web ligero y de alto rendimiento
FROM nginx:stable-alpine

# Copiamos el build generado en la etapa anterior (builder)
# Lo movemos a la ruta que Nginx usa por defecto para servir contenido
COPY --from=builder /app/build /usr/share/nginx/html

# Reemplazamos la configuración por defecto de Nginx con nuestro archivo local
# Útil para manejar rutas de Single Page Apps (SPA) y redirecciones
COPY nginx.conf /etc/nginx/nginx.conf

# Exponemos el puerto 80 (estándar de Nginx)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]