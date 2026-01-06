
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';



function Customernavbar() {
    const navigate=useNavigate()
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Customer_app</Navbar.Brand>
       
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
          <button onClick={()=>navigate("/signupform")}>signup</button>
          <button onClick={()=>navigate("/loginform")}>Login</button>
          </Nav>
          </Navbar.Collapse>
     
      </Container>
    </Navbar>
  );
}

export default Customernavbar;