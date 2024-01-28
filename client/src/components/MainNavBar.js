import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function MainNavBar(props) {
  let expand = "lg";
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    const query = searchRef.current.value;
    props.setSearchClick((prevCount) => prevCount + 1);
    navigate(`/search?query=${query}`);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const query = searchRef.current.value;
    props.setSearchClick((prevCount) => prevCount + 1);
    navigate(`/search?query=${query}`);
  }

  const handleBrandClick = () => {
    searchRef.current.value = "";
    navigate(`/`);
  }

  return (
    <>
        <Navbar expand={expand} className="mb-3" style={{backgroundColor: "#d3d3d3"}}>
          <Container fluid>
            <Navbar.Brand onClick={handleBrandClick} style={{cursor: "pointer"}}>
                <span style={{color: "green"}}>
                    Ani
                </span>
                <span style={{color: "#d95f76"}}>
                    WARES
                </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Navigation Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start" style={{ maxHeight: '100px' }} navbarScroll>
                  <NavDropdown
                    title="Category"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex" onSubmit={handleFormSubmit}>
                  <Form.Control type="text"
                    ref={searchRef}
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success" onClick={handleSearchSubmit}>Search</Button>
                </Form>
                <Nav className="justify-content-end flex-grow-1">
                  <Nav.Link href="#action1">Cart</Nav.Link>
                  <Nav.Link href="#action2">Account</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default MainNavBar;