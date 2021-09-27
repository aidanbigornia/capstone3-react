import React, {useState, useEffect, Fragment} from 'react';

import {
	Container,
	Button,
	Table,
	Modal,
	Form
} from 'react-bootstrap'

import Swal from 'sweetalert2';

export default function AdminView(props){
const{productData, fetchData} = props;

	const [productId, setProductId] = useState('');
	const [products, setProducts] = useState([]);
	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const[ showEdit, setShowEdit] = useState(false);
	const[ showAdd, setShowAdd] = useState(false);	

	let token = localStorage.getItem('token')

	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);

	const openEdit = (productId) => {
		fetch(`https://bookish-mnl.herokuapp.com/api/products/${productId}`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			setProductId(result._id);
			setName(result.name);
			setImage(result.image);
			setPrice(result.price);
			setDescription(result.description);
		});

		setShowEdit(true);

	}
	const closeEdit = () => {

		setShowEdit(false);
		setName("");
		setPrice(0);
		setDescription("");

	}
	console.log(productData)
	useEffect( () => {
		const productsArr = productData.map((product) => 
		{
			console.log("product",product)
			return (
				<tr key={product._id} id="admin-row">
					<td><img  id="image-admin" src={product.image} alt=""/></td>
					<td>{product.name}</td>
					<td id="admin-description">{product.description}</td>
					<td>&#8369;{product.price}</td>
					<td>
						{
							(product.isActive === true)
							? <span>Available</span>
							: <span>Sold Out</span>
						}
					</td>
					<td>
						<Fragment>
							<Button className="update-btn" size="sm" 
							onClick={ ()=> openEdit(product._id) }>
								Update
							</Button>


						{
							(product.isActive === true) ?
								<Button className="update-btn" size="sm"
								onClick={()=> archiveToggle(product._id, product.isActive)}>
									Disable
								</Button>
							:
								<Button className="enable-btn" size="sm"
								onClick={ () => unarchiveToggle(product._id, product.isActive)}>
									Enable
								</Button>
						}

							<Button className="update-btn" id="delete-btn" size="sm"
							onClick={ () => deleteToggle(product._id)}>
								Delete 
							</Button>
						</Fragment>
						
					</td>
				</tr>
			)
		})
		setProducts(productsArr)
	}, [productData])

	const editProduct = (e, productId) => {
		e.preventDefault();

		fetch(`https://bookish-mnl.herokuapp.com/api/products/${productId}/edit`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				image,
				name,
				description,
				price
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			fetchData();

			if(typeof result !== "undefined"){
				// alert("success")

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully updated!"
				})

				closeEdit();
			} else {
				
				fetchData();

				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Something went wrong!"
				})
			}
		})
	}

	const archiveToggle = (productId, isActive) => {
		fetch(`https://bookish-mnl.herokuapp.com/api/products/${productId}/archive`, {
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				 isActive: isActive
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)
			fetchData();

			if(result.isActive !== false){
				Swal.fire({
					title: "Success",
					icon: "success", 
					text: "Product successfully archived"
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Error",
					icon: "error",
					text: "Please Try Again!"
				})
			}
		})
	}

	const unarchiveToggle = (productId, isActive) => {
		fetch(`https://bookish-mnl.herokuapp.com/api/products/${productId}/unarchive`, {
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				 isActive: isActive
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)
			fetchData();

			if(result.isActive !== false){
				Swal.fire({
					title: "Success",
					icon: "success", 
					text: "Product successfully unarchived"
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Error",
					icon: "error",
					text: "Please Try Again!"
				})
			}
		})
	}

	const deleteToggle = (productId) => {
		Swal.fire({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.isConfirmed) {
		    
		 
		fetch(`https://bookish-mnl.herokuapp.com/api/products/${productId}/delete`, {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			fetchData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					"text": "Product deleted"
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					"text": "Please try again"
				})
			}
		})
		 }
		})
	}


	const addProduct = (e) => {
		e.preventDefault();

		fetch('https://bookish-mnl.herokuapp.com/api/products/add',{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price,
				image:image
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)
			if(result === true){
				fetchData();
				Swal.fire({
					title: "Success",
					icon: "success",
					text: " Product Successfully Added! "
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Error",
					icon: "error",
					text: "Something Went Wrong. Plese Try Again",
				});
			}
		})
	}

	return(
		
		<Container>
			<div>
				<h2 className="text-center">Admin Dashboard</h2>

				<div className="d-flex justify-content-center mb-2 col-12">
					<Button id="add-product-btn" onClick={openAdd}>Add New Product</Button>
				</div>
			</div>
			<Table>
				<thead>
					<tr>
						<th>Image</th>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{products}
				</tbody>
			</Table>

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={(e) => editProduct(e, productId)} >
					<Modal.Header>
						<Modal.Title>
							Edit Product
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="productImage">
							<Form.Label>Image</Form.Label>
							<Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId="productName">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId="productDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="productPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
						</Form.Group>
						<Modal.Footer>
							<Button variant="secondary" onClick={closeEdit}>Close</Button>
							<Button variant="success" type="submit">Submit</Button>
						</Modal.Footer>
					</Modal.Body>
				</Form>
			</Modal>

			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={ (e) => addProduct(e) }>
					<Modal.Header>Add Product</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="productImage">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								value={image}
								onChange={ (e)=> setImage(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="productName">
							<Form.Label>Name</Form.Label>
							<Form.Control 
								type="text"
								value={name}
								onChange={(e)=> setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="productDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								value={description}
								onChange={(e)=> setDescription(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="productPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control 
								type="number"
								value={price}
								onChange={(e)=> setPrice(e.target.value)}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</Container>
	)
}