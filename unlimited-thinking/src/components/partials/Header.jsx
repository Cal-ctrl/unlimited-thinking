import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from "react-bootstrap/Container"

const Header = () => {

    return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">Unlimited Thinking</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/times">Film times</Nav.Link>
      <Nav.Link href="/value">Savings</Nav.Link>
    </Nav>
    </Container>
  </Navbar>


    )

};
export default Header;