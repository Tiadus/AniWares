import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import QueryBoard from "../components/QueryBoard";
import Container from "react-bootstrap/esm/Container";
import MainNavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [sessionData, setSessionData] = useState(
        {
            success: false
        }
    );

    const query = searchParams.get('query');
    const brand = searchParams.getAll('brand');
    const category = searchParams.getAll('category');
    const type = searchParams.getAll('type');
    const scale = searchParams.getAll('scale');
    const series = searchParams.getAll('series');
    const minP = searchParams.get('minP');
    const maxP = searchParams.get('maxP');
    const dis = searchParams.get('dis');
    const stat = searchParams.get('stat');

    useEffect(() => {
        fetchSearchData();
    }, [location]);

    const fetchSearchData = async () => {
        let search = query;
        if (search === null) {
            search = "";
        }

        let brandValue = brand;
        if (brandValue.length === 0) {
            brandValue = [""];
        }

        let categoryValue = category;
        if (categoryValue.length === 0) {
            categoryValue = [""];
        }

        let typeValue = type;
        if (typeValue.length === 0) {
            typeValue = [""];
        }

        let scaleValue = scale;
        if (scaleValue.length === 0) {
            scaleValue = [""];
        }

        let seriesValue = series;
        if (seriesValue.length === 0) {
            seriesValue = [""];
        }

        let minPValue = minP;
        if (minPValue === null) {
            minPValue = 0;
        }

        let maxPValue = maxP;
        if (maxPValue === null) {
            maxPValue = 1000000;
        }

        let disValue = dis;
        if (disValue === null) {
            disValue = "";
        }

        let statValue = stat;
        if (statValue === null) {
            statValue = "";
        }

        let sessionRequest = {
            params: {
                search: search,
                brandValue: brandValue,
                categoryValue: categoryValue,
                typeValue: typeValue,
                scaleValue: scaleValue,
                seriesValue: seriesValue,
                nameValue: [""],
                minPriceValue: minPValue,
                maxPriceValue: maxPValue,
                discountValue: disValue,
                statusValue: statValue
            }
        }

        let sessionResponse = await axios.get("/search", sessionRequest);
        let sessionData = sessionResponse.data;
        let items = sessionData.items;
        let brandFilter = sessionData.brands;
        let categoryFilter = sessionData.categories
        let typeFilter = sessionData.types;
        let scaleFilter = sessionData.scales;
        let seriesFilter = sessionData.series
        
        setSessionData({
            success: true,
            search: search,
            items: items,
            itemBrand: brandFilter,
            itemCategory: categoryFilter,
            itemType: typeFilter,
            itemScale: scaleFilter,
            itemSeries: seriesFilter
        })
    };

    const filterChangeHandler = (event) => {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        let isChecked = target.checked;

        let urlData = {
            search: query,
            itemBrand: brand,
            itemCategory: category,
            itemType: type,
            itemScale: scale,
            itemSeries: series
        }

        let currentArray = urlData[name];

        if (currentArray.includes(value) === false && isChecked === true) {
            currentArray.push(value);
        }

        if (currentArray.includes(value) === true && isChecked === false) {
            let indexToRemove = currentArray.indexOf(value);
            currentArray.splice(indexToRemove,1);
        }

        urlData = {
            ...urlData,
            [name]: currentArray
        };

        let newURLParameter = [];
        if (urlData.search) {
            newURLParameter.push("query=" + urlData.search)
        }

        for (const element of urlData.itemBrand) {
            newURLParameter.push("brand=" + element);
        }

        for (const element of urlData.itemCategory) {
            newURLParameter.push("category=" + element);
        }

        for (const element of urlData.itemType) {
            newURLParameter.push("type=" + element);
        }

        for (const element of urlData.itemScale) {
            newURLParameter.push("scale=" + element);
        }

        for (const element of urlData.itemSeries) {
            newURLParameter.push("series=" + element);
        }

        let newURL = newURLParameter.join('&');
        console.log(newURL);
        navigate(`/search?${newURL}`);
    }

    return (
        <div>
            <MainNavBar />
            <div style={{marginTop: "3%"}}>
                <Container>
                    {sessionData.success === true && <QueryBoard sessionData={sessionData} filterChangeHandler={filterChangeHandler}/>}
                </Container> 
            </div>
            <div style={{width: "100%", textAlign: "center", background:"#333333", paddingTop: "1%", marginTop: "4%", paddingBottom: "2%"}}>
                <Container>
                    <Footer />
                </Container>
            </div>
        </div>
    );
}

export default Search;