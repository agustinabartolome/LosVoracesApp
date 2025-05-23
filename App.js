const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

const BookRoutes = require('./routes/BookRoutes');
const MagazineRoutes = require('./routes/MagazineRoutes')
const SchoolSupplyRoute = require('./routes/SchoolSupplyRoute');

// Middleware
app.use(express.json()); 

// RUTAS 
app.use('/books', BookRoutes);
app.use('/magazines', MagazineRoutes);
app.use('/schoolSupply', SchoolSupplyRoute);


app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});