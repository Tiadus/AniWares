import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";

const Cart = (props) => {
    const [cartItems, setCartItem] = useState([]);
    const [userActionCount, setUserActionCount] = useState(0);

    const getCartItem = () => {
        axios.get(`/cart/${props.user}`)
        .then(result => {
            let cartResult = result.data;
            setCartItem(cartResult);
        })
    }

    useEffect(() => {
        getCartItem();
    }, [])

    useEffect(() => {
        console.log(cartItems.length);
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
        .then(result => {
            getCartItem();
        }
        )
        .catch(error => {
            console.log(error);
        });
    }

    const handleCheckout = () => {
        let checkoutCart = {
            userCode: props.user
        }

        axios.post('/api/checkoutCart', checkoutCart)
        .then(result => {
            console.log(result.data.message);
            setCartItem([]);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const createCartItemTable = () => {
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
                    <td>                        
                        <Button variant="danger">
                            Remove
                        </Button>
                    </td>
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
                    <td style={{fontSize: "3vh"}}><b><u>Total</u></b></td>
                    <td></td>
                    <td></td>
                    <td>
                        ${totalPrice.toFixed(2)}
                    </td>
                    <td>
                        <Button variant="success" onClick={handleCheckout}>
                            Payment
                        </Button>
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
            {cartItems.length === 0 && <div><h1>You Have No Item In Cart</h1></div>}
            {cartItems.length > 0 && createCartItemTable()}
        </div>
        </Container>
    )
}

export default Cart;