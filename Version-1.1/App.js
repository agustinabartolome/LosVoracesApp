const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  family: 4
})
  .then(() => console.log('Conectado a MongoDB'))  
  .catch(err => console.error(err));        

app.set('view engine', 'pug');
app.set('views', './views');

const cookieParser = require('cookie-parser');
const AuthRoute = require('./routes/authRoute');
const BookRoute = require('./routes/BookRoute');
const MagazineRoute = require('./routes/MagazineRoute');
// const ProductRoute = require('./routes/ProductRoute');
const SchoolSupplyRoute = require('./routes/SchoolSupplyRoute');
const OrderRoute = require('./routes/OrderRoute');
const SaleRoute = require('./routes/SaleRoute');
const SupplierRoute = require('./routes/SupplierRoute');
const { authenticateToken, authorizeRole } = require('./middleware/AuthMiddleware');
const dashboardRoute = require('./routes/DashboardRoute');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// Root route
/*
app.get('/', (req, res) => {
  res.render('home');
});
*/

app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// RUTAS 
app.use('/auth', AuthRoute);
app.use('/book', BookRoute);
app.use('/magazine', MagazineRoute);
// app.use('/product', ProductRoute);
app.use('/schoolSupply', SchoolSupplyRoute);
app.use('/order', OrderRoute);
app.use('/sale', SaleRoute);
app.use('/supplier', SupplierRoute);
app.use('/', dashboardRoute);


// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
}

module.exports = app;