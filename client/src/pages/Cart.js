import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import PaymentForm from "../components/PaymentForm";
import ShippingForm from "../components/ShippingForm";

const Cart = (props) => {
    //State of the component
    const [cartItems, setCartItem] = useState([]);
    const [shipFormOpen, setShipFormOpen] = useState(false);
    const [shipInformation, setShipInformation] = useState({})
    const [paymentFormOpen, setPaymentFormOpen] = useState(false);

    //Function used to get the current cart of the user
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

    //Used to reset the component every time contents of cart change
    useEffect(() => {
    }, [cartItems])

    //Function used to update the quantity of item in the cart based on user input
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

    //Upon finish checking the content of the cart, the user may proceed to enter ship information
    const handleProceed = () => {
        setShipFormOpen(true);
    }

    //Function used to handle when the user want to make payment for current cart item
    const handlePayment = () => {
        let checkoutCart = {
            userCode: props.user,
            name: shipInformation.name,
            email: shipInformation.email,
            address: shipInformation.address,
            city: shipInformation.city,
            state: shipInformation.state,
            pCode: shipInformation.pCode
        }

        axios.post('/api/checkoutCart', checkoutCart)
        .then(result => {
            setCartItem([]);
            alert(result.data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.response.data.error);
        })
    } 

    //Function used to create a table to list all the item in the cart
    const createCartItemTable = () => {
        let totalPrice = 0;

        let tableBodyData = cartItems.map(item => {
            let itemPrice = item.cartItemQuantity * (item.itemPrice - item.itemPrice * item.itemDiscount);
            totalPrice += itemPrice;
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
                    <td>${itemPrice.toFixed(2)}</td>
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
                        <Button variant="primary" onClick={handleProceed}>
                            Proceed
                        </Button>
                    </td>
                </tr>
            </tbody>
        )

        let table = (<Table>{tableHead}{tableBody}</Table>)
        
        return (
            <div>
                <h1>Cart Information</h1>
                {table}
            </div>
        );
    }

    //Function used to create shipping form
    const shipInformationForm = () => {
        return (
            <div>
                <h1>Shipping Information</h1>
                <ShippingForm setPaymentFormOpen={setPaymentFormOpen} setShipInformation={setShipInformation}/>
            </div>
        )
    }

    //Function used to create payment form
    const paymentInformationForm = () => {
        return (
            <div>
                <h1>Payment Information</h1>
                <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
                    <PaymentForm handlePayment={handlePayment}/>
                </div>
            </div>
        )
    }

    return (
        <Container>
            <div style={{marginTop: "2%"}}>
                {cartItems.length === 0 && <div><h1>You Have No Item In Cart</h1></div>}
                {cartItems.length > 0 && createCartItemTable()}
                <div style={{marginTop: "3%"}}>
                    {shipFormOpen === true && cartItems.length > 0 && shipInformationForm()}
                </div>
                <div style={{marginTop: "3%"}}>
                    {paymentFormOpen === true && cartItems.length > 0 && paymentInformationForm()}
                </div>
            </div>
        </Container>
    )
}

export default Cart;