import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Footer from '../components/Footer';
import MainNavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import DisplayBoard from "../components/DisplayBoard";
import "./Shop.css"
import Banner from "../components/Banner";
import axios from "axios";

const Shop = () => {
    const [homeData, setHomeData] = useState(
        {
            discountItems: []
        }
    )

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        let discountItemRequest = {
            params: {
                search: "",
                brandValue: [""],
                categoryValue: [""],
                typeValue: [""],
                scaleValue: [""],
                seriesValue: [""],
                nameValue: [""],
                minPriceValue: 0,
                maxPriceValue: 1000000,
                discountValue: true,
                statusValue: ""
            }
        }

        let discountResponse = await axios.get("/item", discountItemRequest);
        let discountItems= discountResponse.data;
        setHomeData({
            ...homeData,
            discountItems: discountItems
        })
    };

    return (
        <div>
            <MainNavBar />
            <div style={{marginTop: "3%"}}>
                <Container style={{marginBottom: "4%"}}>
                    <Banner/>
                </Container>
                <div className="captionHolder">
                    <div className="col-sm-4 col-md-4 col-lg-4 caption">On Sale</div>
                </div>
                <Container className="boardHolder">
                    <DisplayBoard items={homeData.discountItems}/> 
                </Container> 
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