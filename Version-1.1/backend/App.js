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

// const cookieParser = require('cookie-parser');
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
origin: (origin, callback) => {
  const whitelist = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://los-voraces-app-frontend.vercel.app'
  ];

  const isVercelPreview = origin?.endsWith('.vercel.app');

  if (!origin) {
    
    callback(null, true);
  } else if (whitelist.includes(origin) || isVercelPreview) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
}



app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
const cookieParser = require('cookie-parser');
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
