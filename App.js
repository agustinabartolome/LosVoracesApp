const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const BookRoute = require('./routes/BookRoute');
const MagazineRoute = require('./routes/MagazineRoute');
const ProductRoute = require('./routes/ProductRoute');
const SchoolSupplyRoute = require('./routes/SchoolSupplyRoute');


// Middleware
app.use(express.json()); 

// RUTAS 
app.use('/book', BookRoute);
app.use('/magazine', MagazineRoute);
app.use('/product', ProductRoute);
app.use('/schoolSupply', SchoolSupplyRoute);


app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});