const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


mongoose.connect('mongodb+srv://admin123:'+process.env.DB_PW+'@cluster0.ua9fz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,    
    useUnifiedTopology: true
})

mongoose.Promise = global.Promise;

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
}); 

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) =>{
    const error = new Error('Route Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;