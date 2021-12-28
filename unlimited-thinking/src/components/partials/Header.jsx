import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from "react-bootstrap/Container"

const Header = () => {

    return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Unlimited Thinking</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Film times</Nav.Link>
      <Nav.Link href="#pricing">Savings</Nav.Link>
    </Nav>
    </Container>
  </Navbar>


    )

};
export default Header;