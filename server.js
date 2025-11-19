const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:5500', // Cambia esto si tu web tiene otro origen
  credentials: true
}));

app.get('/datos', (req, res) => {
  res.json({ mensaje: '¡Funciona el CORS!' });
});

app.listen(3000, () => {
  console.log('Servidor funcionando en http://localhost:3000');
});