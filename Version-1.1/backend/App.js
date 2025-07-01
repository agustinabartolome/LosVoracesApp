const express = require('express');
const cors = require('cors');
const app = express();
const AuthRoute = require('./routes/AuthRoute');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))  
  .catch(err => console.error(err));        

// app.set('view engine', 'pug');
// app.set('views', './views');

const cookieParser = require('cookie-parser');
const BookRoute = require('./routes/BookRoute');
const MagazineRoute = require('./routes/MagazineRoute');
// const ProductRoute = require('./routes/ProductRoute');
const SchoolSupplyRoute = require('./routes/SchoolSupplyRoute');
const OrderRoute = require('./routes/OrderRoute');
const SaleRoute = require('./routes/SaleRoute');
const SupplierRoute = require('./routes/SupplierRoute');
const { authenticateToken, authorizeRole } = require('./middleware/AuthMiddleware');
const DashboardRoute = require('./routes/DashboardRoute');

// Middleware
app.use(cors({
  origin: [ 'http://localhost:3001',
'https://los-voraces-app-frontend.vercel.app/'],
credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.status(200).json({ message: 'API funcionando correctamente' });
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
app.use('/', DashboardRoute);

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
}

module.exports = app;
