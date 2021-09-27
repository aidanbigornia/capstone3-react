import React, {useState, useEffect, Fragment} from 'react';

import {
	Container,
	Button,
	Table,
	Modal,
	Form
} from 'react-bootstrap'

import Swal from 'sweetalert2';

export default function UserData(props){
const{userData, fetchUserData} = props;

	const [userId, setUserId] = useState('');
	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [isAdmin, setIsAdmin] = useState(0);

	const[ showEdit, setShowEdit] = useState(false);
	const[ showAdd, setShowAdd] = useState(false);	

	let token = localStorage.getItem('token')

	useEffect( () => {
		const usersArr = userData.map((user) => 
		{
			return (
				<tr key={user._id} id="admin-row">
					<td>{user.username}</td>
					<td>{user.email}</td>
					<td>{user.mobileNo}</td>
					<td>
						{
							(user.isAdmin === true)
							? <span id="admin-role">Admin</span>
							: <span id="regular-role">Regular User</span>
						}
					</td>
					<td>
						<Fragment>


						{
							(user.isAdmin === true) ?
								<Button className="enable-btn" id="admin-user-btn"
								onClick={ () => unsetAdminToggle(user._id, user.isActive)}>
									Set As Regular User
								</Button>
							:
								<Button className="update-btn" id="admin-user-btn"
								onClick={()=> setAdminToggle(user._id, user.isActive)}>
									Set As Admin
								</Button>
						}

							<Button className="update-btn" id="admin-delete-btn"
							onClick={ () => deleteToggle(user._id)}>
								Delete User
							</Button>
						</Fragment>
						
					</td>
				</tr>
			)
		})
		setUsers(usersArr)
	}, [userData])


	const setAdminToggle = (userId, isAdmin) => {
		fetch(`https://bookish-mnl.herokuapp.com/api/users/${userId}/setAdmin`, {
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				 isAdmin: isAdmin
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)
			fetchUserData();

			if(result.isAdmin !== true){
				Swal.fire({
					title: "Success",
					icon: "success", 
					text: "User is now an Admin"
				})
			} else {
				fetchUserData();
				Swal.fire({
					title: "Error",
					icon: "error",
					text: "User already an Admin"
				})
			}
		})
	}

	const unsetAdminToggle = (userId, isAdmin) => {
		fetch(`https://bookish-mnl.herokuapp.com/api/users/${userId}/unsetAdmin`, {
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				 isAdmin: isAdmin
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)
			fetchUserData();

			if(result.isAdmin !== false){
				Swal.fire({
					title: "Success",
					icon: "success", 
					text: "User is now a Regular User"
				})
			} else {
				fetchUserData();
				Swal.fire({
					title: "Error",
					icon: "error",
					text: "User already an Admin"
				})
			}
		})
	}
	

	const deleteToggle = (userId) => {
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
		    
		 
		fetch(`https://bookish-mnl.herokuapp.com/api/users/${userId}/delete`, {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			fetchUserData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					"text": "User deleted"
				})
			} else {
				fetchUserData();
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


	return(
		
		<Container>
			<div>
				<h2 className="text-center">Admin Dashboard</h2>
			</div>
			<Table>
				<thead>
					<tr>
						<th>Username</th>
						<th>Email</th>
						<th>MobileNo</th>
						<th>Role</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{users}
				</tbody>
			</Table>
		</Container>
	)
}