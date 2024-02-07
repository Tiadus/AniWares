import AccountManagerTab from "../components/AccountManagerTab";

const AccountManager = (props) => {

    return(
        <div>
            <h1>Account Manager</h1>
            <AccountManagerTab user={props.user}/>
        </div>
    );
}

export default AccountManager;