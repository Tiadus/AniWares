import { Link } from "react-router-dom";

const AccountOrder = (props) => {
    const listOrders = () => {
        let orders = props.userOrders.map(item => {
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
                <div key={item.orderCode} style={{border: "1px solid black", borderRadius: "0%", padding:"1%"}}>
                    <h1>Order Code: {item.orderCode}</h1>
                    <h2>Status: {orderStatus} </h2>
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