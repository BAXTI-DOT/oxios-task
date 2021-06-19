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

function App() {

	const [ productName, setProductName ] = useState("")
	const [ variant ] = useState("success")
	const [ disabled, setDisabled ] = useState(true)
	const [ color, setColor ] = useState("secondary")
	const { enqueueSnackbar } = useSnackbar()
	const [ products, setProducts ] = useState([
		{
			id: 1,
			name: 'Product1'
		},
		{
			id: 2,
			name: 'Product2'
		},
		{
			id: 3,
			name: 'Product3'
		},
		{
			id: 4,
			name: 'Product4'
		},
		{
			id: 5,
			name: 'Product5'
		},
	])

	useEffect(() => {
		productName.length === 0 ? setDisabled(true) : setDisabled(false)
	}, [productName])

	useEffect(() => {
		productName.length === 0 ? setColor("secondary") : setColor("primary")
	}, [color, productName])

	const [modal, setModal] = useState(false);

 	const toggle = () => setModal(!modal);

	const createProduct = () => {
		setProducts([...products, { id: products.length + 1, name: productName } ])
		setModal(!modal)
		enqueueSnackbar('Product has successfully been created!', { variant })
		setProductName("")
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
						<Button color={color} disabled={disabled} onClick={toggle, createProduct}>Create product</Button>
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
									<CardImg top width="50%" src={`https://picsum.photos/500/300?random=` + i} alt="Card image cap" />
									<CardBody>
										<CardTitle tag="h5">{e.name}</CardTitle>
										<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
										<Button color="danger">Delete</Button>
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
