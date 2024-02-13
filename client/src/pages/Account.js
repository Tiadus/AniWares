//Import
import { useEffect } from "react";
import AccountRegisterLogin from "./AccountRegisterLogin";
import AccountManager from "./AccountManager";
import Container from "react-bootstrap/esm/Container";

const Account = (props) => {
    //Used to update the page when a user login or logout
    useEffect(() => {

    }, [props.user]);

    return (
        <Container>
            {props.user === 0 && <AccountRegisterLogin/>}
            {props.user !== 0 && <AccountManager user={props.user}/>}
        </Container>
    );
}

export default Account;