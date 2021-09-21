import React from 'react';
import { NavLink} from 'react-router-dom';
/*react-bootstrap components*/
import {
	Container,
	Row,
	Col,
	Jumbotron,
	Button
} from 'react-bootstrap';
import ScrollReveal from 'scrollreveal';

export default function Banner(){

	return(
		<Container >
			<Row className="justify-content-center text-center">
				<Col id="banner"  className="px-0 justify-content-center">
				
					<br/>
					<br/>
					<Jumbotron id="jumbotron" className="text-center">
					  <h1 id="jumbotron-brand"> BOOKISH </h1>
					  
					  <br/>
					  <br/>
					
					  <p id="jumbotron-fonts">#1 Habit of Most Successful People?</p>
					  <Button variant="dark" id="jumbotron-fonts" as={NavLink} to="/Register">READ</Button>
					</Jumbotron>
				</Col>
			</Row>
		</Container>
	)
}

ScrollReveal().reveal('#jumbotron', { duration: 1000 })
ScrollReveal().reveal('#jumbotron-brand', { interval: 200 })
ScrollReveal().reveal('#jumbotron-fonts', { interval: 400 })