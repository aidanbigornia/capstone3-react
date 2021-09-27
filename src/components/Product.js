import React from 'react';
import PropTypes from 'prop-types';

/*react-bootstrap components*/
import {Card, Container,Button} from 'react-bootstrap';

import {Link, useParams, useHistory} from 'react-router-dom';
// import ScrollReveal from 'scrollreveal';
import Swal from 'sweetalert2';



export default function Product({productProp}){
	// console.log(productProp)
	const token = localStorage.getItem("token")
	const {image ,name, description, price, _id} = productProp
	// console.log(productProp.image)
	let history = useHistory();

	const order = () => {
					Swal.fire({
					title: "Success",
					icon: "success",
					text: "Item ordered." 
				})

					history.push('/products');
				
	}
	return(

		<Container fluid>
			<div className="row justify-content-center d-flex">
				<div className="col-6 py-3">
					<Card id="product-card" className="px-2 py-2" >

						<Card.Img src={productProp.image} alt={image} variant="top" className="" loading="lazy"/>
						<Card.Body>
							<Card.Title id="product-text">{name}</Card.Title>
							
							{/*<h5 id="product-text">Description</h5>*/}
							<p id="product-description" className="text-justify">{description}</p>
							{/*<h5 id="product-text">Price :</h5>*/}
							<p id="product-text">&#8369;{price}</p>
							<div className="justify-content-center d-flex">
						    	<Link id="product-button" className="btn btn-info" to={`/products/${_id}`}>
						    		See Book
						    	</Link>
						    	<Button id="product-button" className="btn btn-info" onClick={ () => order()}>
						    		Order Book
						    	</Button>
					    	</div>
						</Card.Body>
					</Card>
				</div>
			</div>			
		</Container>
	)
}


Product.propTypes = {
	product: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}