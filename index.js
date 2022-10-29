const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send("Hola, mi server en Express esta OnLine");
});

app.get('/productos', (req, res) => {
  res.json({
    Nombre: "Johan Ussa",
    Producto: "Celular",
    Precio: 26500
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server run in port ${port}`);
});
