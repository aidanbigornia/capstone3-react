import React, {useContext, useEffect, useState} from 'react';

import UserContext from './../UserContext';

import {Link, useParams, useHistory} from 'react-router-dom';

import {Container, Card, Button} from 'react-bootstrap';

import Swal from 'sweetalert2';


export default function SpecificCourse(){

	const [image, setImage] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0)

	const { user } = useContext(UserContext);

	const { productId } = useParams();

	let token = localStorage.getItem('token')

	let history = useHistory();
	const order = () => {
					Swal.fire({
					title: "Success",
					icon: "success",
					text: "Item ordered" 
				})

					history.push('/products');
				
	}


	useEffect( () => {
		fetch(`https://bookish-mnl.herokuapp.com/api/products/${productId}`,
			{
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			}
		)
		.then(result => result.json())
		.then(result => {
			console.log(result)

			setImage(result.image);
			setName(result.name);
			setDescription(result.description);
			setPrice(result.price);
		})
	}, [])

	
	return(
		<Container>
			<Card>
				<Card.Header>

					<h4>
						{name}
					</h4>
				</Card.Header>
				<Card.Body>
					<img src={image} alt=""/>
					<Card.Text>
						{description}
					</Card.Text>
					<h6>
						Price: &#8369; 
						<span className="mx-2">{price}</span>
					</h6>
				</Card.Body>
				<Card.Footer>
					{
						(user.id !== null) ?
								<Button id="product-button" className="btn btn-info" 
								onClick={ () => order() }

								> Order</Button>
							:
								<Link className="btn btn-danger" to="/login">Login to Order</Link>
					}
				</Card.Footer>
			</Card>
		</Container>
	)
}