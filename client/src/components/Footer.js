import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
    return (
        <Container style={{width: "100%", textAlign: "center"}}>
            <Row style={{ marginTop: "10px", alignItems: 'flex-start', justifyContent: 'center', color: "white" }}>
                <Col lg={3} md={12} sm={12}>
                    <div><h1>Service</h1></div>
                    <div>Account Management</div>
                    <div>Order Tracking</div>
                    <div>Trade-In Service</div>
                </Col>
                <Col lg={3} md={12} sm={12}>
                    <div><h1>About Us</h1></div>
                    <div>The Team</div>
                    <div>Our Blog</div>
                </Col>
                <Col lg={3} md={12} sm={12}>
                    <div><h1>Policy</h1></div>
                    <div>Term of Use</div>
                    <div>Return Policy</div>
                    <div>Privacy Policy</div>
                    <div>Security Policcy</div>
                </Col>
                <Col lg={3} md={12} sm={12}>
                    <div><h1>Contact</h1></div>
                    <div><a href="https://www.facebook.com/vietthai.nguyen.35175">Facebook</a></div>
                    <div><a href="mailto:vietthai.nguyen03@gmaile.com">Gmail</a></div>
                    <div><a href="https://www.linkedin.com/in/viet-thai-nguyen-606160299/">Linkend</a></div>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;