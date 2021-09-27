import React, {useState, useEffect, useContext} from 'react';


// react-bootstrap components
import {Container} from 'react-bootstrap';
import UserData from './../components/UserData';
import UserContext from './../UserContext';

export default function Users(){

	const [users, setUsers] = useState([])
	const {user} = useContext(UserContext);

	const fetchUserData = () => {
		let token = localStorage.getItem('token')

		fetch('https://bookish-mnl.herokuapp.com/api/users/all',{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result, "result from user")
			setUsers(result)
		})
	}

	useEffect(() => {
		fetchUserData()
	}, [])
	return (
		<Container className="p-4"  id="user-wall" fluid>
					<UserData userData={users} fetchUserData={fetchUserData}/>	
		</Container>
	)

}