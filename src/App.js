import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Products from './pages/Products';
import Login from './pages/Login';
import UserContext from './UserContext';
import './Style.css';


export default function App(){
	const [user, setUser] = useState(
		{
			id: null,
			isAdmin: null,
			email: null
		}
	);

	const unsetUser = () => {
		localStorage.clear();
		setUser({
			id: null,
			isAdmin: null,
			email: null
		})
	}

	useEffect( () => {
		let token = localStorage.getItem('token');
		fetch('https://bookish-mnl.herokuapp.com/api/users/profile', {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			// console.log(result) //object/ document of a user

			if(typeof result._id !== "undefined"){
				setUser({
					id: result._id,
					isAdmin: result.isAdmin,
					email: result.email
				})
			} else {
				setUser({
					id: null,
					isAdmin: null,
					email: null
				})
			}
		})
	}, [])

	return(
		<UserContext.Provider value={{user, setUser, unsetUser}}> 
			<BrowserRouter>
				<AppNavbar/>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/products" component={Products} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					{/*<Route exact path="/courses/:courseId" component={SpecificCourse} />
					<Route exact path="/addCourse" component={AddCourse} />
					<Route component={ErrorPage} />*/}
				</Switch>
			</BrowserRouter>
		</UserContext.Provider>
	)
}