import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import { setUserCode } from "../redux/userSlice";

const AccountInformation = (props) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setUserCode(0));
    }

    return (
        <div>
            <div>
                User Name: {props.userInformation.userName} <br/>
                User Email: {props.userInformation.userEmail} <br/>
                <Button variant="danger" onClick={handleLogout} style={{marginTop: "1%"}}>
                    Logout
                </Button>
            </div>
        </div>
    );
}

export default AccountInformation;