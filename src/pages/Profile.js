import React, {useContext, useEffect, useState} from 'react';

import UserContext from './../UserContext';

import {Link, useParams, useHistory} from 'react-router-dom';

import {Container, Card, Button} from 'react-bootstrap';

import Swal from 'sweetalert2';


export default function Profile(){

	// const [image, setImage] = useState('');
	// const [name, setName] = useState('');
	// const [description, setDescription] = useState('');
	// const [price, setPrice] = useState(0)

	const { user } = useContext(UserContext);


	let token = localStorage.getItem('token')

	let history = useHistory();

// 	useEffect( () => {
// 	})	
}