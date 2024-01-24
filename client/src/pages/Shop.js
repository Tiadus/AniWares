import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Footer from '../components/Footer';
import MainNavBar from "../components/NavBar";
import Home from "../components/Home";

const Shop = () => {
    return (
        <div style={{width: "100%", height: "100%"}}>
            <MainNavBar />
            <div style={{height: "100%", marginTop: "3%"}}>
                <Home />
            </div>
            <div style={{width: "100%", textAlign: "center", background:"#333333", paddingTop: "1%", marginTop: "4%", paddingBottom: "2%"}}>
                <Container>
                    <Footer />
                </Container>
            </div>
        </div>
    );
};

export default Shop;