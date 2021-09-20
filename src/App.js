import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import UserContext from './UserContext';
import './Style.css';


export default function App(){

	return(
		<UserContext.Provider> 
			<BrowserRouter>
				<AppNavbar/>
				<Switch>
					<Route exact path="/" component={Home} />
					{/*<Route exact path="/courses" component={Courses} />*/}
					<Route exact path="/register" component={Register} />
					{/*<Route exact path="/login" component={Login} />
					<Route exact path="/courses/:courseId" component={SpecificCourse} />
					<Route exact path="/addCourse" component={AddCourse} />
					<Route component={ErrorPage} />*/}
				</Switch>
			</BrowserRouter>
		</UserContext.Provider>
	)
}