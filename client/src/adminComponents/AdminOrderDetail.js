import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const AdminOrderDetail = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const oid = searchParams.get("oid");
    const [order, setOrder] = useState({})
    const [orderItems, setOrderItems] = useState([]);
    const [actionCount, setActionCount] = useState(0);
    const [exceedStock, setExceedStock] = useState([]);

    useEffect(() => {
        axios.get(`/api/admin/orderDetail?oid=${oid}`)
        .then(results => {
            let resultData = results.data;
            let order = resultData.order;
            let orderItems = resultData.orderItems;
            let exceedStockItemCode = [];
            for (let i = 0; i < orderItems.length; i++) {
                if (orderItems[i].orderItemQuantity < orderItems[i].orderItemPrice) {
                    exceedStockItemCode.push(orderItems[i].itemCode);
                }
            }
            setOrder(order);
            setOrderItems(orderItems);
            setExceedStock(exceedStockItemCode);
        })
        .catch();
    }, [actionCount]);

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
            let inStock = true;
            if (item.orderItemQuantity > item.itemQuantity) {
                inStock = false;
            }
            let cost = item.orderItemQuantity * item.orderItemPrice;
            total += cost;
            return (
                <tr key={item.itemName}>
                    <td>{item.itemCode}</td>
                    <td><img src={item.itemImage} style={{maxHeight: "10vh"}}/></td>
                    <td>{item.itemBrand} {item.itemSeries} {item.itemName}</td>
                    <td>{item.itemQuantity}</td>
                    <td>
                        {inStock === true && <span style={{color: "green"}}>{item.orderItemQuantity}</span>}
                        {inStock === false && <span style={{color: "red"}}>{item.orderItemQuantity}</span>}
                    </td>
                    <td>{item.orderItemPrice}</td>
                    <td>{cost}</td>
                </tr>
            )
        })

        let tableHead = (
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Image</th>
                    <th>Item Description</th>
                    <th>Stock</th>
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

    const acceptOrder = () => {
        if (exceedStock.length > 0) {
            let itemCodes = exceedStock.join(', ');
            return alert("The Following Item Code Has Order Quantity Exceed Stock: " + itemCodes);
        }

        let userCode = order.userCode;
        let orderCode = order.orderCode;
        let orderStatus = 0;

        let manageOrder = {
            userCode: userCode,
            orderCode: orderCode,
            orderStatus: orderStatus
        }
        
        axios.post('/api/admin/manageOrder', manageOrder)
        .then(result => {
            console.log(result.data.message);
            setActionCount(prevState => (
                prevState + 1
            ))
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data.error);
        })
    }

    const rejectOrder = () => {
        let userCode = order.userCode;
        let orderCode = order.orderCode;
        let orderStatus = 2;

        let manageOrder = {
            userCode: userCode,
            orderCode: orderCode,
            orderStatus: orderStatus
        }
        
        axios.post('/api/admin/manageOrder', manageOrder)
        .then(result => {
            console.log(result.data.message);
            setActionCount(prevState => (
                prevState + 1
            ))
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data.error);
        })
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
                        <div style={{marginTop: "2%"}}>
                            <Button variant="success" onClick={acceptOrder}>Accept Order</Button>
                            <Button variant="danger" onClick={rejectOrder} style={{marginLeft: "2%"}}>Reject Order</Button>
                        </div>
                    </div>
                }
            </Container>
    )
}

export default AdminOrderDetail;