const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db'); // Conexión a MongoDB

const lockersRoutes = require('./routes/lockers'); // Asegúrate que la carpeta se llame "routes"

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', lockersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});