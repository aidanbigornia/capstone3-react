import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

/*react-bootstrap components*/
import {Card, Button,Container} from 'react-bootstrap';

import {Link} from 'react-router-dom';
import ScrollReveal from 'scrollreveal';



export default function Product({productProp}){
	console.log(productProp)

	const {image ,name, description, price, _id} = productProp
	console.log(productProp.image)

	return(

		<Container>
			<div className="row justify-content-center">
				<div className="col col-9 py-3">
					<Card id="product-card" className="px-2 py-2" >

						<Card.Img src={productProp.image} alt={image} variant="top" className="" loading="lazy"/>
						<Card.Body>
							<Card.Title id="product-text">{name}</Card.Title>
							
							{/*<h5 id="product-text">Description</h5>*/}
							<p id="product-description" className="text-justify">{description}</p>
							{/*<h5 id="product-text">Price :</h5>*/}
							<p id="product-text">&#8369;{price}</p>

					    	<Link id="product-button" className="btn btn-warning" to={`/products/${_id}`}>
					    		Details
					    	</Link>
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