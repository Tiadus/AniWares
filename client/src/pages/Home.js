import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from "react";
import DisplayBoard from "../components/DisplayBoard";
import "./Home.css"
import Banner from "../components/Banner";
import axios from "axios";

const Home = () => {
    const [homeData, setHomeData] = useState(
        {
            discountItems: []
        }
    )

    useEffect(() => {
        fetchHomeData();
    }, []);

    //Function used to fetch the currently on discount item
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
};

export default Home;