import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUserCode } from '../redux/userSlice';
import { useState } from 'react';
import Row from 'react-bootstrap/esm/Row';

const AccountLogin = () => {
    const [warning,setWarning] = useState("");
    const loginCredentialRef = useRef(null);
    const passwordRef = useRef(null);
    const warningRef = useRef(null);
    const dispatch = useDispatch();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        let loginCredential = loginCredentialRef.current.value;
        let password = passwordRef.current.value;

        if (loginCredential === "") {
            return alert("Please Input User Name or Email Address");
        }

        if (password === "") {
            return alert("Please Input Password");
        }

        let login = {
            loginCredential: loginCredential,
            password: password
        }

        axios.post('/api/login', login)
        .then(result => {
            let resultData = result.data;
            if (resultData.error) {
                switch(resultData.error) {
                    case 404:
                        return setWarning("No Matching User");
                }
            }
            dispatch(setUserCode(resultData.userCode));
        })
    }

    return (
        <Row>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12}>
                <Form onSubmit={(event) => {
                    formSubmitHandler(event);
                }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User Name / Email Address</Form.Label>
                        <Form.Control ref={loginCredentialRef} type="text" placeholder="Enter user name or email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                        <span>{warning}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember Me" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Col>
            <Col style={{display:"flex", justifyContent: "center"}}>
                <div>
                    <h1>Greeting Shop Benefactor</h1>
                </div>
            </Col>
        </Row>
    )
}

export default AccountLogin;