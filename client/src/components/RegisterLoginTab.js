import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountLogin from './AccountLogin';
import AccountRegister from './AccountRegister'

const RegisterLoginTab = (props) => {

    useEffect(() => {
    }, []);

    return (
        <Tabs
            defaultActiveKey="home"
            id="fill-tab-example"
            className="mb-3"
            fill
        >
        <Tab eventKey="home" title="Login">
            <AccountLogin/>
        </Tab>

        <Tab eventKey="profile" title="Register">
            <AccountRegister/>
        </Tab>
      </Tabs>
    );
}

export default RegisterLoginTab;