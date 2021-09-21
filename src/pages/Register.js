import React, {useState, useEffect, useContext} from 'react';

/*react router dom*/
import {NavLink, useHistory, Redirect } from 'react-router-dom';

/*react-bootstrap components*/
import {Container, Form, Button, Nav} from 'react-bootstrap';

/*context*/
import UserContext from './../UserContext';

/*sweetalert*/
import Swal from 'sweetalert2';


export default function Register(){
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	const {user} = useContext(UserContext)

	let history = useHistory();

	useEffect( () => {
		if(email !== '' && password.length >= 8 && verifyPassword !== '' && password === verifyPassword){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [email, password, verifyPassword]);


	function register(e){
		e.preventDefault();

		fetch('https://bookish-mnl.herokuapp.com/api/users/check-email', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then( result => result.json())
		.then( result => {
			// console.log(result, "result from check email")
			if(result === true){
				Swal.fire({
					title: 'Email already existing.',
					icon: 'error',
					text: 'Please choose another email'
				})
			} else {
				e.preventDefault();

				fetch('https://bookish-mnl.herokuapp.com/api/users/check-username', {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: username
					})
				})
				.then(result => result.json())
				.then( result => {
					if(result === true){
						// console.log(result,"result from checkusername")
						Swal.fire({
							title: 'Username already existing.',
							icon: 'error',
							text: 'Please choose another username'
						})
					} else {

					fetch('https://bookish-mnl.herokuapp.com/api/users/register', {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							username: username,
							email: email,
							mobileNo: mobileNo,
							password: password
						})
					})
					.then( result => result.json())
					.then( result => {

						if(result === true){

							Swal.fire({
								title: "Registration Successful",
								icon: "success",
								text: "Welcome to Bookish"
							})

							history.push('/login');

						} else {
							Swal.fire({
								title: 'Something went wrong',
								icon: 'error',
								text: 'Please try again'
							})
						}
					})

					}
				})

				setUsername('');
				setMobileNo('');
				setEmail('');
				setPassword('');
				setVerifyPassword('');
			}


		})
		}
			return (
				(user.id !== null) ?

					<Redirect to="/" />

				:

					<Container className="mb-5">
						<h1 className="text-center">Register</h1>

						<Form onSubmit={(e)=> register (e)}>
							<Form.Group className="mb-3" controlId="formUsername">
								<Form.Label>Username</Form.Label>
								<Form.Control type="text" placeholder="Enter Username" value={username}
								onChange={(e)=> setUsername(e.target.value) }/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formmobileNo">
								<Form.Label>Mobile Number</Form.Label>
								<Form.Control type="text" placeholder="Enter mobile mumber" value={mobileNo}
								onChange={(e)=> setMobileNo(e.target.value) }/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email Address</Form.Label>
								<Form.Control type="email" placeholder="Enter Email" value={email}
								onChange={(e)=> setEmail(e.target.value) }/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label id="register-password">Password</Form.Label>
								<Form.Control type="password" placeholder="Password" value={password}
								onChange={(e)=> setPassword(e.target.value) }/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formVerifyPassword">
								<Form.Label>Verify Password</Form.Label>
								<Form.Control type="password" placeholder="Verify Password"  value={verifyPassword}
								onChange={(e)=> setVerifyPassword(e.target.value)}/>

							</Form.Group>
							<Nav.Link className="px-0 py-0" as={NavLink} to="/Login">Already registered? Click here to sign in.</Nav.Link>
							<Button variant="primary" type="submit" disabled={isDisabled}>Submit</Button>

						</Form>
					</Container>
			)
		}
		