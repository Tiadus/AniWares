import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import { Routes, Route } from "react-router-dom";
import AdminDashBoard from "./adminComponents/AdminDashBoard";
import AdminOrderView from "./adminComponents/AdminOrdersView";
import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import { setUserPrivilege } from "./redux/userSlice";
import { useNavigate } from "react-router-dom";
import AdminOrderDetail from "./adminComponents/AdminOrderDetail";

const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = () => {
        navigate("/");
        return dispatch(setUserPrivilege(0));
    }

    return (
        <Container style={{marginTop: "1%"}}>
            <Col xxl={12}>
                <span style={{fontSize: "2.6vh"}}>ADMIN MODE</span>
                <Button variant="danger" style={{float: "right"}} onClick={handleLogOut}>Logout</Button>
            </Col>
            <div style={{marginTop: "2%"}}>
                <Routes>
                    <Route index element={<AdminDashBoard/>}/>
                    <Route path="/" element={<AdminDashBoard/>}/>
                    <Route path="/aov" element={<AdminOrderView/>}/>
                    <Route path="/aod" element={<AdminOrderDetail/>}/>
                </Routes>
            </div>
        </Container>
    )
}

export default Admin;