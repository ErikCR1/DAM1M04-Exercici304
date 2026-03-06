const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});


app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const httpServer = app.listen(port, () => {
  console.log(`Servidor actiu a: http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  httpServer.close();
  process.exit(0);
});