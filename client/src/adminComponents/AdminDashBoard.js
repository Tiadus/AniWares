import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const AdminDashBoard = () => {
    const navigate = useNavigate();

    const buttonClickHandler = (buttonNum) => {
        switch(buttonNum) {
            case 1:
                navigate('/aov');
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Welcome Admin!</h2>
            <span style={{fontSize: "3vh"}}>Actions: </span>
            <Button 
            variant="primary"
            style={{marginRight: "1%"}}
            onClick={() => {buttonClickHandler(1)}}
            >
                Manage Orders
            </Button>
            <Button variant="success">Manage Items</Button>
        </div>
    )
}

export default AdminDashBoard;