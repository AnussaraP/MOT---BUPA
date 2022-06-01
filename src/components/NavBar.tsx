import { Container, Nav, Navbar } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Bupa</Navbar.Brand>
        <Nav className="me-auto"></Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
