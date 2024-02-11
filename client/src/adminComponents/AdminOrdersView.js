import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import "bootstrap/dist/css/bootstrap.min.css";


const AdminOrderView = () => {
    const user = useSelector((state) => state.user.userCode);
    const searchRef = useRef();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        let params = {
                userCode: 1,
                orderCode: ""
        };

        let request = {params};

        axios.get(`/api/admin/orderView`, request)
        .then(result => {
            setOrders(result.data);
        })
    }, [])

    const listOrders = () => {
        let orderList = orders.map(item => {
            let orderStatus = "";
            switch (item.orderStatus) {
                case 0:
                    orderStatus = (<span style={{color: "green"}}>Accepted</span>);
                    break;
                case 1:
                    orderStatus = (<span style={{color: "#BDA55D"}}>Pending</span>);
                    break;
                case 2:
                    orderStatus = (<span style={{color: "red"}}>Rejected</span>);
                    break;
                default:
                    orderStatus = (<span>Pending</span>);
            }
            return (
                <Col
                    key={item.orderCode} 
                >
                    <div style={{border: "1px solid black", padding:"1%"}}>
                        <h1>Order Code: {item.orderCode}</h1>
                        <h2>Status: {orderStatus} </h2>
                        <Link to={`/aod?oid=${item.orderCode}`}>View Detail</Link>
                    </div>
                </Col>
            )
        })
        return orderList;
    }

    const handleSearchSubmit = () => {
        const query = searchRef.current.value;

        let params = {
            userCode: 1,
            orderCode: query
        };

        let request = {params};

        axios.get(`/api/admin/orderView`, request)
        .then(result => {
            setOrders(result.data);
        })
    }
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        //const query = searchRef.current.value;
        //props.setSearchClick((prevCount) => prevCount + 1);
        //navigate(`/search?query=${query}`);
    }

    return (
        <div>
            <Form className="d-flex" onSubmit={handleFormSubmit} style={{width:"100%"}}>
                <Form.Control type="text"
                ref={searchRef}
                placeholder="Order Code"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="success" onClick={handleSearchSubmit}>Search</Button>
            </Form>
            <div style={{marginTop: "2%"}}>
                <Row xxl={2} xl={2} lg={1} md={1} sm={1} className="g-3">
                    {listOrders()}
                </Row>
            </div>
        </div>
    )
}

export default AdminOrderView;