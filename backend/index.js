const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import Routes
const commentsRoutes = require('./routes/comments');
const notificationsRoutes = require('./routes/notifications');
const oilQualityRoutes = require('./routes/oilQuality');
const ordersRoutes = require('./routes/orders');
const pressingRoutes = require('./routes/pressing');
const pricesRoutes = require('./routes/prices');
const productsRoutes = require('./routes/products');
const settingsRoutes = require('./routes/settings');
const shippingRatesRoutes = require('./routes/shippingRates');

// Use Routes
app.use('/api/comments', commentsRoutes.default || commentsRoutes);
app.use('/api/notifications', notificationsRoutes.default || notificationsRoutes);
app.use('/api/oil-quality', oilQualityRoutes.default || oilQualityRoutes);
app.use('/api/orders', ordersRoutes.default || ordersRoutes);
app.use('/api/pressing', pressingRoutes.default || pressingRoutes);
app.use('/api/prices', pricesRoutes.default || pricesRoutes);
app.use('/api/products', productsRoutes.default || productsRoutes);
app.use('/api/settings', settingsRoutes.default || settingsRoutes);
app.use('/api/shipping-rates', shippingRatesRoutes.default || shippingRatesRoutes);

app.get('/', (req, res) => {
  res.send('Thazdayth API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
