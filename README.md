Frontend for NestJS CRUD Blog (Abraham Santos Torres) Este proyecto es el frontend de una aplicación de blog que, junto con su backend correspondiente, permite realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) desde la perspectiva de un administrador o superusuario.

Tecnologías Utilizadas: HTML CSS JavaScript Bootstrap para el diseño Node.js y Express para el servidor de proxy

Requisitos Previos Antes de iniciar, asegúrate de tener instalado Node.js (que incluye npm) en tu sistema. También necesitas tener el backend corriendo para que el frontend funcione correctamente.

Configuración del Proyecto Clonar el Repositorio Para obtener el proyecto, clona el repositorio desde GitHub:

git clone https://github.com/abrahamsantos-developer/front-nestjs-crud-blog.git cd front-nestjs-crud-blog

Instalación de Dependencias Instala las dependencias necesarias ejecutando:

npm install

Configuración del Servidor de Proxy El servidor de proxy está configurado para redirigir las solicitudes a la API del backend. Aquí está cómo está configurado en server.js:

//server.js import express from 'express'; import { createProxyMiddleware } from 'http-proxy-middleware'; import path from 'path'; import { fileURLToPath } from 'url';

const app = express(); const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use('/api', createProxyMiddleware({ target: 'http://localhost:5500', // Apunta al backend de NestJS changeOrigin: true, pathRewrite: { '^/api': '' }, }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });

app.listen(port, () => { console.log(Proxy server running on http://localhost:${port}); });

Ejecutar la Aplicación Para iniciar el servidor de proxy y el frontend, usa:

npm start

Asegúrate de tener el Backend ejecutándose en http://localhost:5500 antes de iniciar el frontend.

El frontend estará accesible en: URL del Frontend: http://localhost:3000

Características CRUD Completo: Interfaz para crear, leer, actualizar y eliminar posts. Búsqueda Avanzada: Filtra posts por autor, título o contenido.

Futuras Mejoras Implementacion de ValidationPipes. Mejorar la interfaz a un diseño más avanzado. Implementar autenticación con JWT. Establecer propietarios (usuarios) de posts para definir permisos de edición y borrado.

Contribuciones Las contribuciones son bienvenidas. Si tienes mejoras o correcciones, por favor considera enviar un pull request.