import "bootstrap/dist/css/bootstrap.min.css";
import DisplayBoard from "../components/DisplayBoard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Shop = () => {
    return (
        <div style={{width: "100%"}}>
            <Container fluid>
                <div style={{marginTop: "4%"}}>
                    <DisplayBoard /> 
                </div>
                <div style={{marginTop: "4%"}}>
                    <DisplayBoard /> 
                </div>
            </Container>
            <div style={{width: "100%", textAlign: "center", background:"red", paddingTop: "1%", marginTop: "4%"}}>
                <Container style={{width: "100%", textAlign: "center"}}>
                    <Row style={{marginTop: "10px", alignItems: 'center', justifyContent: 'center'}}>
                        <Col lg={3} md={12} sm={12}>
                            Service
                        </Col>
                        <Col lg={3} md={12} sm={12}>
                            About
                        </Col>
                        <Col lg={3} md={12} sm={12}>
                            Contact
                        </Col>
                        <Col lg={3} md={12} sm={12}>
                            Facebook
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Shop;