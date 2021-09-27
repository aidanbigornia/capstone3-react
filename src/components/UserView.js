import React, {useState, useEffect} from 'react';

import {Container} from 'react-bootstrap';
import {Link, useParams, useHistory} from 'react-router-dom';

import Product from './Product';

export default function UserView({productData}){

	
	console.log(productData)

	const [products, setProducts] = useState([])

	useEffect( () => {
		const productsArr = productData.map( (product) => {
			if(product.isActive === true){
				return <Product key={product._id} productProp={product}/>
			} else {
				return null
			}
		})
		setProducts(productsArr)
	}, [productData])

	return(
		<Container id="bg-products">
			{/*display PRODUCTS*/}
			{products}
		</Container>
	)
}