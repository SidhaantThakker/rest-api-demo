const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
});

router.post('/', (req, res, next) =>{
    res.status(201).json({
        message: 'Handling POST requests to /products'
    })
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `GET request to /products with id ${id}`
    })
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `PATCH request to /products with id ${id}`
    })
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `DELETE request to /products with id ${id}`
    })
});

module.exports = router;
