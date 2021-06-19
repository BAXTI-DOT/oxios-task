const express = require('express')

const router = express.Router()

const PRODUCTS = require('./products/products')

router
	.get('/products', PRODUCTS.GET_PRODUCTS)
	.post('/createProducts', PRODUCTS.CREATE_PRODUCTS)
	.delete('/deleteProducts', PRODUCTS.DELETE_PRODUCTS)

module.exports = router