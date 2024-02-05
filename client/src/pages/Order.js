import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";

const Order = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const oid = searchParams.get("oid");

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(`/order?oid=${oid}`)
        .then(results => {
            let orders = results.data;
            setOrders(orders);
        })
        .catch();
    }, []);

    const createOrderItemTable = () => {
        let tableBodyData = orders.map(item => {
            console.log(item.itemSeries);
            return (
                <tr key={item.itemName}>
                    <td><img src={item.itemImage} style={{maxHeight: "10vh"}}/></td>
                    <td>{item.orderItemQuantity}</td>
                    <td>{item.itemBrand} {item.itemSeries} {item.itemName}</td>  
                </tr>
            )
        })

        let tableHead = (
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Qty</th>
                    <th>Item Description</th>
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
        return table;
    }

    return (
            <Container>
            <h1>Order Number: {oid}</h1>
            <div style={{marginTop: "2%"}}>
                {createOrderItemTable()}
            </div>
            </Container>
    )
}

export default Order;