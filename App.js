const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

const BookRoute = require('./routes/BookRoute');
const MagazineRoute = require('./routes/MagazineRoute');
// const ProductRoute = require('./routes/ProductRoute');
const SchoolSupplyRoute = require('./routes/SchoolSupplyRoute');
const OrderRoute = require('./routes/OrderRoute');
const SaleRoute = require('./routes/SaleRoute');
const SupplierRoute = require('./routes/SupplierRoute');

// Middleware
app.use(express.json()); 

// Root route
app.get('/', (req, res) => {
  res.send(`
    <h1>bienvenidos a Los Voraces</h1>
    <h2>Catalogos disponibles:</h2>
    <ul>
      <li><a href='/book'>Books</a></li>
      <li><a href='/magazine'>Magazines</a></li>
      <li><a href='/schoolSupply'>School Supplies</a></li>
    </ul>
    <h2>Gestión:</h2>
    <ul>
      <li><a href='/order'>Orders</a></li>
      <li><a href='/sale'>Sales</a></li>
      <li><a href='/supplier'>Suppliers</a></li>
    </ul>
  `);
});

// RUTAS 
app.use('/book', BookRoute);
app.use('/magazine', MagazineRoute);
// app.use('/product', ProductRoute);
app.use('/schoolSupply', SchoolSupplyRoute);
app.use('/order', OrderRoute);
app.use('/sale', SaleRoute);
app.use('/supplier', SupplierRoute)


app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});