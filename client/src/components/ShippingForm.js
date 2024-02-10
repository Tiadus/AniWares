import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useRef } from "react";

const ShippingForm = ({setPaymentFormOpen, setShipInformation}) => {
    const nameRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const pCodeRef = useRef();

    const handleFormChange = () => {
        setPaymentFormOpen(false);
    }

    const handleFormSubmit = () => {
        let name = nameRef.current.value;
        let email = emailRef.current.value;
        let address = addressRef.current.value;
        let city = cityRef.current.value;
        let state = stateRef.current.value;
        let pCode = pCodeRef.current.value;

        if (name === "" || email === "" || address === "" || city === "" || state === "" || pCode === "") {
            return alert("Please Fill Out All The Required Information For Shipping!");
        }

        let shipInformation = {
            name: name,
            email: email,
            address: address,
            city: city,
            state: state,
            pCode: pCode
        }

        setShipInformation(shipInformation);
        setPaymentFormOpen(true);
    }

    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Recipient Name</Form.Label>
                        <Form.Control ref={nameRef} onChange={handleFormChange} type="text" placeholder="Enter Full Name" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control ref={emailRef} onChange={handleFormChange} type="text" placeholder="Enter Email" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicAdress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control ref={addressRef} onChange={handleFormChange} type="text" placeholder="Enter Address" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control ref={cityRef} onChange={handleFormChange} type="text" placeholder="Enter City" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicState">
                        <Form.Label>State</Form.Label>
                        <Form.Control ref={stateRef} onChange={handleFormChange} type="text" placeholder="Enter State" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPCode">
                        <Form.Label>Post Code</Form.Label>
                        <Form.Control ref={pCodeRef} onChange={handleFormChange} type="number" placeholder="Enter Post Code" />
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" onClick={handleFormSubmit}>
                Submit Shipping Information
            </Button>
        </Form>
    )
}

export default ShippingForm;