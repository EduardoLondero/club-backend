const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('public'));

app.get('/pagina', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});