const { fetch, fetchAll } = require('../../lib/postgres')

const PRODUCTS = `
	SELECT
		*
	FROM
		products_oxios
`

const CREATE_PRODUCTS = `
	INSERT INTO
		products_oxios(name)
	VALUES($1)
		RETURNING *
`

const DELETE_PRODUCTS = `
	DELETE FROM
		products_oxios
	WHERE
		id = $1
	RETURNING
		id
`

const getProducts 		= () 			=> fetchAll(PRODUCTS)
const createProducts 	= (name) 		=> fetch(CREATE_PRODUCTS, name)
const deleteProducts 	= (id) 			=> fetch(DELETE_PRODUCTS, id)

module.exports = {
	getProducts,
	createProducts,
	deleteProducts
}