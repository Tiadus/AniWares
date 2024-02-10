import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col";
import Nav from 'react-bootstrap/esm/Nav';
import Row from "react-bootstrap/esm/Row";
import Tab from 'react-bootstrap/Tab';
import { useRef } from "react";

const PaymentForm = ({handlePayment}) => {
    const cardOwnerRef = useRef();
    const cardNumberRef = useRef();
    const cardExpirMMRef = useRef();
    const cardExpirYYRef = useRef();
    const cardCVVRef = useRef();

    const handlePaymentSubmit = (event) => {
        event.preventDefault();
        let cardOwner = cardOwnerRef.current.value;
        let cardNumber = cardNumberRef.current.value;
        let cardExpirMM = cardExpirMMRef.current.value;
        let cardExpirYY = cardExpirYYRef.current.value;
        let cardCVV = cardCVVRef.current.value;

        if (cardOwner === "" || cardNumber === "" || cardExpirMM === "" || cardExpirYY === "" || cardCVV === "") {
            return alert("Please Fill Out All The Required Information For Payment!");
        }

        handlePayment();
    }

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row style={{width: "50%"}}>
                <Col sm={12} style={{padding: "3%"}}>
                    <Nav variant="pills" >
                        <Nav.Item>
                            <Nav.Link eventKey="first">Credit Card</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Paypal</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={12}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Form onSubmit={(event) => {
                                handlePaymentSubmit(event);
                            }}>
                                <Form.Group className="mb-3" controlId="formBasicCardOwner">
                                    <Form.Label>Card Owner</Form.Label>
                                    <Form.Control ref={cardOwnerRef} type="text" placeholder="Name On Card" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCardNumber">
                                    <Form.Label>Card Number</Form.Label>
                                    <Form.Control ref={cardNumberRef} type="text" placeholder="Valid Card Number" />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEXPY">
                                            <Form.Label>Expiration Date</Form.Label>
                                            <Row>
                                                <Col><Form.Control ref={cardExpirMMRef} type="text" placeholder="MM" /></Col>
                                                <Col><Form.Control ref={cardExpirYYRef} type="text" placeholder="YY" /></Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEXPY">
                                            <Form.Label>CVV</Form.Label>
                                            <Form.Control ref={cardCVVRef} type="text" placeholder="" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="success" type="submit" style={{width:"100%"}}>
                                    Confirm Payment
                                </Button>
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">Paypal Redirecting</Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default PaymentForm;