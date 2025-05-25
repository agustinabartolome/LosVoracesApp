const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

const BookRoute = require('./routes/BookRoute');
const MagazineRoute = require('./routes/MagazineRoute')
const SchoolSupplyRoute = require('./routes/SchoolSupplyRoute');

// Middleware
app.use(express.json()); 

// RUTAS 
app.use('/book', BookRoute);
app.use('/magazine', MagazineRoute);
app.use('/schoolSupply', SchoolSupplyRoute);


app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});