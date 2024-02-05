const AccountInformation = (props) => {
    return (
        <div>
            <div>
                User Name: {props.userInformation.userName} <br/>
                User Email: {props.userInformation.userEmail} <br/>
            </div>
        </div>
    );
}

export default AccountInformation;