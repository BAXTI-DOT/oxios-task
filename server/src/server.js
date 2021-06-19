const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./modules/routes')
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(routes)

app.listen(PORT, () => {
	console.log(`Server ready at ${PORT}`)
})