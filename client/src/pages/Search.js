import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Search = () => {
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
    }, []);

    const fetchFilterData = async (
        search, brandValue, categoryValue, typeValue, scaleValue,
        seriesValue, minPriceValue, maxPriceValue, discountValue,
        statusValue, group, ignore) => {
            let params = {
                    search: search,
                    brandValue: brandValue,
                    categoryValue: categoryValue,
                    typeValue: typeValue,
                    scaleValue: scaleValue,
                    seriesValue: seriesValue,
                    nameValue: [""],
                    minPriceValue: minPriceValue,
                    maxPriceValue: maxPriceValue,
                    discountValue: discountValue,
                    statusValue: statusValue,
                    group: group
                };
            
            params = {
                ...params,
                [ignore]: [""]
            }

            let filterRequest = {params};
            let filterResponse = await axios.get("/item", filterRequest);
            return filterResponse.data;
    }

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

        let itemRequest = {
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

        let itemResponse = await axios.get("/item", itemRequest);
        let items = itemResponse.data;

        let brandFilter = await fetchFilterData(
            search, brandValue, categoryValue, typeValue,
            scaleValue, seriesValue, minPValue, maxPValue,
            disValue, statValue, "itemBrand", "brandValue"
        );

        let categoryFilter = await fetchFilterData(
            search, brandValue, categoryValue, typeValue,
            scaleValue, seriesValue, minPValue, maxPValue,
            disValue, statValue, "itemCategory", "categoryValue"
        );

        let typeFilter = await fetchFilterData(
            search, brandValue, categoryValue, typeValue,
            scaleValue, seriesValue, minPValue, maxPValue,
            disValue, statValue, "itemType", "typeValue"
        );

        let scaleFilter = await fetchFilterData(
            search, brandValue, categoryValue, typeValue,
            scaleValue, seriesValue, minPValue, maxPValue,
            disValue, statValue, "itemScale", "scaleValue"
        );

        let seriesFilter = await fetchFilterData(
            search, brandValue, categoryValue, typeValue,
            scaleValue, seriesValue, minPValue, maxPValue,
            disValue, statValue, "itemSeries", "seriesValue"
        );
        
        setSessionData({
            success: true,
            items: items,
            brandFilter: brandFilter,
            categoryFilter: categoryFilter,
            typeFilter: typeFilter,
            scaleFilter: scaleFilter,
            seriesFilter: seriesFilter
        })
    };

    return (
        <div>
            {sessionData.success === true && <h1>Loading Success</h1>}
        </div>
    );
}

export default Search;