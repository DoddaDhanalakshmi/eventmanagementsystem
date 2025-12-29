import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Owner() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Owner App</Navbar.Brand>

          <Nav className="ms-auto">
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              variant="outline-success"
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
            <Button
              variant="outline-success"
              onClick={() => navigate("/logout")}
            >
              logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Owner;
