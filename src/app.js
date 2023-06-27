const express = require('express'); // importanto express
const bodyParser = require('body-parser'); // importandoo body-parser
const mongoose = require('mongoose');

const app = express(); // instânciando o express
const router = express.Router(); // acessar as rotas

// Conecta ao banco
mongoose.connect('mongodb+srv://user:password@database.mongodb.net/');

// Carrega os models
const Product = require('./models/product')

// Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json()); // middleware para bodyparser converter o req para json
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;