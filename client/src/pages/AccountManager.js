import { useState, useEffect } from "react";
import axios from "axios";
import AccountManagerTab from "../components/AccountManagerTab";
import AccountInformation from "../components/AccountInformation";
import AccountOrder from "../components/AccountOrder";

const AccountManager = (props) => {

    return(
        <div>
            <h1>Account Manager</h1>
            <AccountManagerTab user={props.user}/>
        </div>
    );
}

export default AccountManager;