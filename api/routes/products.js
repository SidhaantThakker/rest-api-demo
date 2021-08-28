const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const product = require('../models/product');

const Product = require('../models/product');

router.get('/', (req, res, next) =>{
    Product.find()
    .select('name price _id')
    .exec()
    .then(products => {
        const response = {
            count: products.length,
            products: products.map(product => {
                return {
                    name: product.name,
                    price: product.price,
                    _id: product._id,
                }
            }),
            request: {
                type: 'GET',
                description: 'Get all products',
                url: 'http://localhost:3000/products'
            }
        }
        console.log(response)
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err);
        res.send(500).json({
            error: err
        })
    })
});

router.post('/', (req, res, next) =>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Product created successfully',
            createdProduct: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
    .exec()
    .then(product => {
        console.log(product)
        if(product){
            res.status(200).json(product)
        } else {
            res.status(404).json({
                message: `No product found for ID: ${id}`
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productID;
    const updateProps = {};
    for (const prop of req.body){
        updateProps[prop.propName] = prop.value;
    }
    Product.updateOne({_id: id}, {$set: updateProps}).exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product updated successfully',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/product' + id
            }
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productID;
    Product.remove({_id: id}).exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Product deleted successfully!',
            request: {
                type: 'DELETE',
                url: 'http://localhost:3000/products/'+id
            }
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
