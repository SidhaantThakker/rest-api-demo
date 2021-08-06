const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    })
});

router.post('/', (req, res, next) =>{
    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Handling POST requests to /orders'
    })
});

router.get('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    res.status(200).json({
        message: `GET request to /orders with id ${id}`
    })
});

router.patch('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    res.status(200).json({
        message: `PATCH request to /orders with id ${id}`
    })
});

router.delete('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    res.status(200).json({
        message: `DELETE request to /orders with id ${id}`
    })
});

module.exports = router;
