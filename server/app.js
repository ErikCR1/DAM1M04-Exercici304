const express = require('express');
const path = require('path');

const app = express();

// IMPORTANTE: Para el servidor Proxmox, usamos el puerto que nos den las variables de entorno
// Si no hay ninguna (en local), usará el 3000.
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
}); 
// He eliminado la palabra "cursos" que estaba aquí y rompía el código

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const httpServer = app.listen(port, () => {
  // Ahora el log te dirá el puerto real en el que está trabajando
  console.log(`🚀 Servidor listo en el puerto: ${port}`);
});

process.on('SIGINT', async () => {
  httpServer.close();
  process.exit(0);
});