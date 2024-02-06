import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/esm/Container";

const Cart = (props) => {
    const [cartItems, setCartItem] = useState([]);

    useEffect(() => {
        axios.get(`/cart/${props.user}`)
        .then(result => {
            let cartResult = result.data;
            setCartItem(cartResult);
        })
    }, [cartItems])

    const setQty = (event) => {
        let target = event.target;
        let itemCode = target.name;
        let value = target.value;

        const updateCart = {
            fromAddCart: false,
            userCode: props.user,
            itemCode: itemCode,
            cartItemQuantity: value
        }

        axios.post('/api/updateCart', updateCart)
        .then(
            axios.get(`/cart/${props.user}`)
            .then(result => {
                let cartResult = result.data;
                setCartItem(cartResult);
            })
        )
        .catch(error => {
            console.log(error);
        });
    }

    const createCartItemTable = () => {
        if (cartItems.length == 0) {
            return (
                <h1>You Have No Item In Cart</h1>
            )
        };

        let totalPrice = 0;

        let tableBodyData = cartItems.map(item => {
            totalPrice += item.itemPrice * item.cartItemQuantity;
            return (
                <tr key={item.itemName + item.cartItemQuantity}>
                    <td><img src={item.itemImage} style={{maxHeight: "10vh"}}/></td>
                    <td>{item.itemBrand} {item.itemSeries} {item.itemName}</td> 
                    <td>
                        <input 
                            type="number"
                            defaultValue={item.cartItemQuantity}
                            min="1"
                            style={{width:"3vw"}}
                            name={item.itemCode}
                            onInput={setQty}
                        />
                    </td>
                    <td>${(item.cartItemQuantity * item.itemPrice).toFixed(2)}</td>
                    <td><button>Remove</button></td>
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
                    <th>Action</th>
                </tr>
            </thead>
        )

        let tableBody = (
            <tbody>
                {tableBodyData}
                <tr>
                    <td><b><u>Total</u></b></td>
                    <td></td>
                    <td></td>
                    <td>
                        ${totalPrice.toFixed(2)}
                    </td>
                    <td>
                        <button>Payment</button>
                    </td>
                </tr>
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
        <div style={{marginTop: "2%"}}>
            {createCartItemTable()}
        </div>
        </Container>
    )
}

export default Cart;