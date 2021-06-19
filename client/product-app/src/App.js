import { useState, useEffect } from 'react';
import './app.css'
import {
	Row,
	Container,
	Col,
	Card, 
	CardImg, 
	CardText, 
	CardBody,
	CardTitle, 
	Button,
	Modal, ModalHeader, ModalBody, ModalFooter,
	Input
 } from 'reactstrap'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useSnackbar } from 'notistack';
import axios from 'axios'

function App() {

	const [ productName, setProductName ] = useState("")
	const [ variant ] = useState("success")
	const [ disabled, setDisabled ] = useState(true)
	const [ color, setColor ] = useState("secondary")
	const { enqueueSnackbar } = useSnackbar()
	const [ products, setProducts ] = useState([])

	useEffect(() => {
		productName.length === 0 ? setDisabled(true) : setDisabled(false)
	}, [productName])

	useEffect(() => {
		productName.length === 0 ? setColor("secondary") : setColor("primary")
	}, [color, productName])

	useEffect(() => {
		;(async() => {
			try {
				const res = await axios.get('http://localhost:8080/products')
				const data = await res.data.data
				setProducts([...data])
			}
			catch(err) {
				console.log(err)
			}
		})()
	}, [])

	const [modal, setModal] = useState(false);

 	const toggle = () => setModal(!modal);

	const createProduct = () => {
		;(async() => {
			try {
				const newProduct = await axios.post('http://localhost:8080/createProducts', {
					name: productName,
				})
				if(newProduct) {
					setProducts([...products, { id: newProduct.data.data.id, name: newProduct.data.data.name } ])
					setModal(!modal)
					enqueueSnackbar('Product has successfully been created!', { variant })
					setProductName("")
				}
			}
			catch(err) {
				console.log(err)
			}
		})()
	}
	
	const deleteProduct = (id) => {
		;(async() => {
			try {
				const deletedProduct = await axios.delete('http://localhost:8080/deleteProducts', {
					data: {
						id
					}
				})
				console.log(deletedProduct.data.data.id)
				if(deletedProduct) {
					setProducts(products.filter((e, i) => e.id !== deletedProduct.data.data.id))
					enqueueSnackbar('Product has successfully been deleted!', { variant })
				}
			}
			catch(err) {
				console.log(err)
			}
		})()
	}
	
	return (
		<div className="container">
			<Container>
				<Modal isOpen={modal} toggle={toggle}>
					<ModalHeader toggle={toggle}>New product</ModalHeader>
					<ModalBody>
						<Input onKeyUp={e => setProductName(e.target.value)} placeholder="Product name" />
					</ModalBody>
					<ModalFooter>
						<Button color={color} disabled={disabled} onClick={createProduct}>Create product</Button>
					</ModalFooter>
				</Modal>
				<div className="header">
					<h1>Products</h1>
					<Fab onClick={toggle} color="primary" aria-label="add">
						<AddIcon />
					</Fab>
				</div>
				<Row>
					{
						products && products.map((e, i) => (
							<Col key={i} sm="4">
								<Card>
									<CardImg top width="50%" src={`https://picsum.photos/500/300?random=` + (i + 1)} alt="Card image cap" />
									<CardBody>
										<CardTitle tag="h5">{e.name}</CardTitle>
										<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
										<Button onClick={() => deleteProduct(e.id)} color="danger">Delete</Button>
									</CardBody>
								</Card>
							</Col>
						))
					}
				</Row>
			</Container>
		</div>
	);
}

export default App;
