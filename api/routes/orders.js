const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    })
});

router.post('/', (req, res, next) =>{
    res.status(201).json({
        message: 'Handling POST requests to /orders'
    })
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `GET request to /orders with id ${id}`
    })
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `PATCH request to /orders with id ${id}`
    })
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `DELETE request to /orders with id ${id}`
    })
});

module.exports = router;
