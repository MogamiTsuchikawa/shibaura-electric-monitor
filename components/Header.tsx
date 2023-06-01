import { Container, Nav, Navbar } from "react-bootstrap";

export const Header = () => (
  <Navbar bg="primary" variant="dark">
    <Container>
      <Navbar.Brand href="/">SIT Electric Monitor</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/dojou">土壌情報データベース</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);
