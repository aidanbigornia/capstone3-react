import React, {Fragment, useContext} from 'react';
import {
	Navbar,
	Nav
} from 'react-bootstrap';

import { Link, NavLink, useHistory } from 'react-router-dom';

export default function AppNavbar(){
	// const {user, unsetUser} = useContext(UserContext);

	// let history = useHistory();


	// const logout = () => {
	//   unsetUser();
	//   history.push('/login');
	// }

	// let leftNav = (user.id !== null) ? 
	//       (user.isAdmin === true) ?
	//         <Fragment>
	//           <Nav.Link as={NavLink} to="/addCourse">Add Course</Nav.Link>
	//           <Nav.Link onClick={logout}>Logout</Nav.Link>
	//         </Fragment>
	//       :
	//         <Fragment>
	//           <Nav.Link onClick={logout}>Logout</Nav.Link>
	//         </Fragment>
	//   :
	//     (
	//       <Fragment>
	//           <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
	//           <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
	//         </Fragment>

	//     )
	return (
	    <Navbar id="navbar" expand="lg">
	      <Navbar.Brand id="navbar-brand"  className="px-4" as={Link} to="/">BOOKISH</Navbar.Brand>
	      <Navbar.Toggle aria-controls="basic-navbar-nav" />
	      <Navbar.Collapse id="basic-navbar-nav">
	        <Nav >
	          <Nav.Link id="nav-links" as={NavLink} to="/">Home</Nav.Link>
	          <Nav.Link id="nav-links" as={NavLink} to="/products">Products</Nav.Link>
	        </Nav>
	        <Nav>
	          {/*{leftNav}*/}
	        </Nav>
	      </Navbar.Collapse>
	    </Navbar>
 	)	


}