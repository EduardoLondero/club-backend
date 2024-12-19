const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

<<<<<<< HEAD
app.use(express.static('public'));

// Definir una ruta de ejemplo
app.get('/pagina', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
=======
// Definir una ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

>>>>>>> 4c243cab533402b817edd35939405d0fb0cdd12b
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});