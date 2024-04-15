import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// To get the directory name of the current module:
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuración del Proxy para redirigir solicitudes a la API del backend
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:5500', // Apunta al backend de NestJS
    changeOrigin: true,
    pathRewrite: { '^/api': '' }, // Reescribe la ruta eliminando /api
}));

// Servir archivos estáticos para el frontend
app.use(express.static(path.join(__dirname, 'public')));

// Captura todas las rutas no definidas y redirige al index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});
