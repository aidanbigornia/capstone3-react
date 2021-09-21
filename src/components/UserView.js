import React, {useState, useEffect} from 'react';

import {Container} from 'react-bootstrap';

import Product from './Product';

export default function UserView({productData}){

	// console.log(productData)

	const [products, setProducts] = useState([])

	useEffect( () => {
		const productsArr = productData.map( (product) => {
			// console.log(course)
			if(product.isActive === true){
				return <Product key={product._id} productProp={product}/>
			} else {
				return null
			}
		})
		setProducts(productsArr)
	}, [productData])

	return(
		<Container>
			{/*display PRODUCTS*/}
			{products}
		</Container>
	)
}