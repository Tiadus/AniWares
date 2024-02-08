import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUserCode } from '../redux/userSlice';
import Row from 'react-bootstrap/esm/Row';

const AccountRegister = () => {
    const userNameRef = useRef();
    const userEmailRef = useRef();
    const userPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const dispatch = useDispatch();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        let userName = userNameRef.current.value;
        let userEmail = userEmailRef.current.value;
        let userPassword = userPasswordRef.current.value;
        let confirmPassword = confirmPasswordRef.current.value;

        if (userName === "") {
            return alert("Please Enter User Name!");
        }

        if (userEmail === "") {
            return alert("Please Enter User Email!");
        }

        if (userPassword === "") {
            return alert("Please Enter Password");
        }

        if (userPassword !== confirmPassword) {
            return alert("Password Don't Match!");
        }

        let register = {
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword
        }

        axios.post('/api/register', register)
        .then(result => {
            let resultData = result.data;
            if (resultData.error) {
                switch(resultData.error) {
                    case 1:
                        alert("User Name Already Exist");
                        break;
                    case 2:
                        alert("Email Already Exist");
                        break;
                    default:
                        alert("An Error Has Occured! Contact Admin!");
                }
                return;
            }
            dispatch(setUserCode(resultData.userCode));
        })
    }

    return (
        <Row>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12}>
                <div style={{display:"flex", justifyContent: "center"}}>
                    <h1> Welcome New Customer</h1>
                </div>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12}>
                <Form onSubmit={(event) => {formSubmitHandler(event);}}>
                    <Form.Group className="mb-3" controlId="formBasicUserNameRegister">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control ref={userNameRef} type="text" placeholder="Enter user name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmailRegister">
                        <Form.Label>Email</Form.Label>
                        <Form.Control ref={userEmailRef} type="text" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPasswordRegister">
                        <Form.Label>Password</Form.Label>
                        <Form.Control ref={userPasswordRef} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicConfirmPasswordRegister">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control ref={confirmPasswordRef} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default AccountRegister;