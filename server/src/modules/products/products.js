const model = require('./model')

module.exports = {
	GET_PRODUCTS: async(req, res) => {
		try {
			const products = await model.getProducts()
			res.status(200).json({ data: products })
		} 
		catch(err) {
			res.status(500).json({ status: "Internal Server Error"})	
		}
	},
	CREATE_PRODUCTS: async(req, res) => {
		try {
			const { name } = req.body
			const newProduct = await model.createProducts(name)

			if(newProduct) {
				res.status(200).json({ data: newProduct })
			} else {
				res.status(400).send("Product has not been created")
			}
		}
		catch(err) {
			res.status(500).json({ status: "Internal Server Error"})	
		}
	},
	DELETE_PRODUCTS: async(req, res) => {
		try {
			const { id } = req.body
			const deletedProduct = await model.deleteProducts(id)

			if(deletedProduct) {
				res.status(200).json({ data: deletedProduct})
			} else {
				res.status(400).send("Product has not been deleted")
			}
		}
		catch(err) {
			res.status(500).json({ status: "Internal Server Error"})	
		}
	}
}