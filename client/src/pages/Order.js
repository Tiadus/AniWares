import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const Order = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const oid = searchParams.get("oid");
    const [order, setOrder] = useState({})
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        axios.get(`/order?oid=${oid}`)
        .then(results => {
            let resultData = results.data;
            let order = resultData.order;
            let orderItems = resultData.orderItems;
            setOrder(order);
            setOrderItems(orderItems);
        })
        .catch();
    }, []);

    const orderStatus = () => {
        const status = order.orderStatus;
        let orderStatus;
        switch (status) {
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
        return orderStatus
    }

    const shipInformationView = () => {
        return (
            <div>
                <h1>Shipping Information</h1>
                <div style={{}}>
                    Customer Name: {order.customerName} <br/>
                    Email: {order.email} <br/>
                    Delivery Address: {order.address}, {order.city}, {order.state} {order.pCode}
                </div>
            </div>
        )
    }

    const createOrderItemTable = () => {
        let total = 0
        let tableBodyData = orderItems.map(item => {
            let cost = item.orderItemQuantity * item.orderItemPrice;
            total += cost;
            return (
                <tr key={item.itemName}>
                    <td><img src={item.itemImage} style={{maxHeight: "10vh"}}/></td>
                    <td>{item.itemBrand} {item.itemSeries} {item.itemName}</td> 
                    <td>{item.orderItemQuantity}</td>
                    <td>{item.orderItemPrice}</td>
                    <td>{cost}</td>
                </tr>
            )
        })

        let tableHead = (
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Item Description</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Cost</th>
                </tr>
            </thead>
        )

        let tableBody = (
            <tbody>
                {tableBodyData}
            </tbody>
        )

        let table = (
            <Table>
                {tableHead}
                {tableBody}
            </Table>
        )

        return(
            <div>
                <h1>Order Detail</h1>
                {table}
                <h2>Total: ${total.toFixed(2)}</h2>
            </div>
        );
    }

    return (
        
            <Container>
                {oid && 
                    <div>
                        <Row>
                            <Col><h1>Order Number: {oid}</h1></Col>
                            <Col><h1 style={{float:"right"}}>Order Status: {orderStatus()}</h1></Col>
                        </Row>
                        {shipInformationView()}
                        {createOrderItemTable()}
                    </div>
                }
            </Container>
    )
}

export default Order;