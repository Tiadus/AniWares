import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AccountInformation from "../components/AccountInformation";
import AccountOrder from "../components/AccountOrder";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

const AccountManagerTab = (props) => {
    const [userInformation, setUserInformation] = useState({});
    const [userOrders, setUserOrders]= useState([]);

    useEffect(() => {
        axios.get(`/account/${props.user}`)
        .then(result => {
            let fetchedUser = result.data;
            let fetchedUserInformation = fetchedUser.userInformation;
            let fetchedUserOrders = fetchedUser.userOrders;
            setUserInformation(
                {
                    userName: fetchedUserInformation.userName,
                    userEmail: fetchedUserInformation.userEmail
                }
            );
            setUserOrders(fetchedUserOrders);
        });
    }, []);

    return (
        <Tabs
            defaultActiveKey="home"
            id="fill-tab-example"
            className="mb-3"
            fill
        >
        <Tab eventKey="home" title="Account Information">
            <AccountInformation userInformation={userInformation} />
        </Tab>

        <Tab eventKey="profile" title="Order Information">
            <AccountOrder userOrders={userOrders}/>
        </Tab>
      </Tabs>
    );
}

export default AccountManagerTab;