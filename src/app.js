const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

// Connecta ao banco
mongoose.connect(config.connectionString);

// Carrega os Models
const Customer = require('./customer/customer-model');
const Payment = require('./payment/payment-model');
const Upload = require('./upload/upload-model');

// Carrega as Rotas
const customerRoute = require('./customer/customer-route');
//const paymentRoute = require('./payment/payment-route');
//const uploadRoute = require('./upload/upload-route');

app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// app.use('/payments', paymentRoute);
app.use('/customers', customerRoute);
// app.use('/uploads', uploadRoute);

module.exports = app;