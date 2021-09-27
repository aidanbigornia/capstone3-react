import React, {useState, useEffect, useContext} from 'react';
import { Redirect } from 'react-router-dom'

/*Context*/
import UserContext from './../UserContext';
import Swal from 'sweetalert2';

/*react-bootstrap components*/
import {Container, Form, Button} from 'react-bootstrap';

export default function Login(){
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);	

	/*destructure context object*/
	const {user, setUser} = useContext(UserContext);

	useEffect( () => {
		if(username !== '' && password !== ''){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [username, password]);

	function login(e){
		e.preventDefault();

		// alert('Login Successful');
		fetch('https://bookish-mnl.herokuapp.com/api/users/login', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
		.then(result => result.json())
		.then(result => {
			// console.log(result) //{access: token}
			if(typeof result.access !== "undefined"){
				//what should we do with the access token?

				localStorage.setItem('token', result.access)
				userDetails(result.access)
			} else {
				Swal.fire({
					title: 'Username or Password is wrong',
					icon: 'error',
					text: 'Please try again.'
				})
			}
		}) 

		const userDetails = (token) => {
			fetch('https://bookish-mnl.herokuapp.com/api/users/profile',{
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then(result => result.json())
			.then(result => {
				console.log(result) //whole user object or document

				setUser({
					id: result._id,
					isAdmin: result.isAdmin,
					email: result.email
				});
				localStorage.setItem('email', result.email)
				localStorage.setItem('isAdmin', result.isAdmin)
				localStorage.setItem('userId', result._id)
			})
			Swal.fire({
					title: 'Login Successful',
					icon: 'success',
					text: `Hello ${username}`
				})
			}

		console.log(setUser)
		// setUser({username: username});

		localStorage.setItem('username', username)

		setUsername('');
		setPassword('');
	}

	return (
		(user.id !== null) ? 

			<Redirect to="/products" />

		: 

			<Container className="mb-5">
				<h1 className="text-center">Login</h1>
				<Form onSubmit={ (e) => login(e) }>
					<Form.Group className="mb-3" controlId="formUsername">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" placeholder="Enter Username" value={username}
						onChange={(e)=> setUsername(e.target.value) }/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" value={password}
						onChange={(e)=> setPassword(e.target.value) }/>
					</Form.Group>

					<Button variant="primary" type="submit" disabled={isDisabled}>Submit</Button>
				</Form>
			</Container>
	)
}