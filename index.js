const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { logErors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());        // habilita cualuier origen
routerApi(app);

app.use(logErors);      // Encapsulan los errores de manera global se ejecutan
app.use(boomErrorHandler);  // en ese orden y siempre van despues del routerApi(app)
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send("Hola, mi server en Express esta OnLine");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server run in port ${port}`);
});
