import "bootstrap/dist/css/bootstrap.min.css";
import DisplayBoard from "../components/DisplayBoard";
import Container from 'react-bootstrap/Container';
import Footer from '../components/Footer';
import MainNavBar from "../components/NavBar";

const Shop = () => {
    return (
        <div style={{width: "100%"}}>
            <MainNavBar />
            <Container fluid>
                <div style={{marginTop: "4%"}}>
                    <DisplayBoard /> 
                </div>
                <div style={{marginTop: "4%"}}>
                    <DisplayBoard /> 
                </div>
            </Container>
            <div style={{width: "100%", textAlign: "center", background:"#333333", paddingTop: "1%", marginTop: "4%"}}>
                <Footer />
            </div>
        </div>
    );
};

export default Shop;