import { Link } from "react-router-dom";

const AccountOrder = (props) => {
    const listOrders = () => {
        let orders = props.userOrders.map(item => {
            return (
                <div key={item.orderCode} style={{border: "1px solid black", borderRadius: "0%", padding:"1%"}}>
                    <h1>Order Code: {item.orderCode}</h1>
                    <Link to={`/order?oid=${item.orderCode}`}>View Detail</Link>
                </div>
            )
        })
        return orders;
    }

    return (
        <div>
            {listOrders()}
        </div>
    )
}

export default AccountOrder;