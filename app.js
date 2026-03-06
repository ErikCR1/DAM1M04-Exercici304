const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Static files (Aquí és on viurà el teu puzle: index.html, script.js, estils.css)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Disable cache
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// --- RUTAS ---

// He netejat la ruta arrel perquè no busqui a la base de dades
app.get('/', (req, res) => {
  // Al tenir express.static('public'), si tens un index.html a /public, 
  // ja es carregarà sol, però deixem la ruta neta per si de cas.
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- SERVER START ---
const httpServer = app.listen(port, () => {
  console.log(`Servidor actiu a: http://localhost:${port}`);
});

// Graceful shutdown (Netejat de db.end)
process.on('SIGINT', async () => {
  httpServer.close();
  process.exit(0);
});