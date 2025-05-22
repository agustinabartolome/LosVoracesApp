const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const SchoolSupplyRoute = require('./routes/SchoolSupplyRoute');

// Middleware
app.use(express.json()); 

// RUTAS 
app.use('/schoolSupplies', SchoolSupplyRoute);


app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});