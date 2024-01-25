import "bootstrap/dist/css/bootstrap.min.css";
import DisplayBoard from "../components/DisplayBoard";
import Container from 'react-bootstrap/Container';
import "./Home.css"
import Banner from "./Banner";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = (props) => {
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
                brandValue: "",
                categoryValue: "",
                typeValue: "",
                scaleValue: "",
                seriesValue: "",
                nameValue: "",
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

    return(
        <div>
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
    );
}

export default Home;