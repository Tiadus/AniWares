//The function is used to query the database for matching item based on the parameter.
//It is also used to query the database for a list of filter based on the search value.
const queryItemPromise = (search, itemBrand, itemCategory, itemType, itemScale, itemSeries, itemName, minPrice, maxPrice, discount, status, group, pool) => {
    return new Promise(function(resolve,reject) {
        let sql = `SELECT * FROM ITEM `;
        if (group !== "") {
            sql = `SELECT ${group}, COUNT(*) AS total FROM ITEM `;
        }
        let queryValue = [];

        const searchValue = `WHERE CONCAT(itemBrand, itemCategory, itemType, itemScale, itemSeries, itemName) LIKE ? `;
        sql += searchValue;
        queryValue.push(search);
        
        if (itemBrand[0] !== "" && group !== "itemBrand") {
            const brandQueryValue = itemBrand.map(() => "?").join(",");
            const brandValue = `AND itemBrand IN (${brandQueryValue}) `;
            sql += brandValue;
            for (var i = 0; i < itemBrand.length; i++) {
                queryValue.push(itemBrand[i]);
            }
        }

        if (itemCategory[0] !== "" && group !== "itemCategory") {
            const categoryQueryValue = itemCategory.map(() => "?").join(",");
            const categoryValue = `AND itemCategory IN (${categoryQueryValue}) `;
            sql += categoryValue;
            for (var i = 0; i < itemCategory.length; i++) {
                queryValue.push(itemCategory[i]);
            }
        }

        if (itemType[0] !== "" && group !== "itemType") {
            const typeQueryValue = itemType.map(() => "?").join(",");
            const typeValue = `AND itemType IN (${typeQueryValue}) `;
            sql += typeValue;
            for (var i = 0; i < itemType.length; i++) {
                queryValue.push(itemType[i]);
            }
        }

        if (itemScale[0] !== "" && group !== "itemScale") {
            const scaleQueryValue = itemScale.map(() => "?").join(",");
            const scaleValue = `AND itemScale IN (${scaleQueryValue}) `;
            sql += scaleValue;
            for (var i = 0; i < itemScale.length; i++) {
                queryValue.push(itemScale[i]);
            }
        }

        if (itemSeries[0] !== "" && group !== "itemSeries") {
            const seriesQueryValue = itemSeries.map(() => "?").join(",");
            const seriesValue = `AND itemSeries IN (${seriesQueryValue}) `;
            sql += seriesValue;
            for (var i = 0; i < itemSeries.length; i++) {
                queryValue.push(itemSeries[i]);
            }
        }

        sql += `AND itemPrice BETWEEN ? AND ? `;
        queryValue.push(minPrice);
        queryValue.push(maxPrice);

        if (discount !== false) {
            sql += `AND itemDiscount > 0 `;
        }

        if (status === "instock") {
            sql += `AND itemQuantity > 0 `;
        }

        if (status === "preorder") {
            sql += `AND itemQuantity > -1 `;
        }

        if (group !== "") {
            sql += `GROUP BY ${group}`;
            queryValue.push(group);
        }

        pool.query(sql, queryValue, (error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result);
        })
    });
}

//The function is used to filter out the request from the api which get the search value for item and its filter
const getRequest = (req) => {
    let queryJSON = {
        search: `%${""}%`,
        brandValue: [""],
        categoryValue: [""],
        typeValue: [""],
        scaleValue: [""],
        seriesValue: [""],
        nameValue: [""],
        minPriceValue: 0,
        maxPriceValue: 1000000,
        discountValue: false,
        statusValue: "",
        group: ""
    };

    if(req) {
        if (req.query.search) {
            queryJSON.search = `%${req.query.search}%`
        }
    
        if (req.query.brandValue) {
            queryJSON.brandValue = req.query.brandValue;
        }
    
        if (req.query.categoryValue) {
            queryJSON.categoryValue = req.query.categoryValue;
        }
    
        if (req.query.typeValue) {
            queryJSON.typeValue = req.query.typeValue;
        }
    
        if (req.query.scaleValue) {
            queryJSON.scaleValue = req.query.scaleValue;
        }
    
        if (req.query.seriesValue) {
            queryJSON.seriesValue = req.query.seriesValue;
        }
    
        if (req.query.nameValue) {
            queryJSON.nameValue = req.query.nameValue;
        }
    
        if (req.query.minPriceValue) {
            queryJSON.minPriceValue = req.query.minPriceValue;
        }
    
        if (req.query.maxPriceValue) {
            queryJSON.maxPriceValue = req.query.maxPriceValue;
        }
    
        if (req.query.discountValue) {
            queryJSON.discountValue = req.query.discountValue; 
        }
    
        if (req.query.statusValue) {
            queryJSON.statusValue = req.query.statusValue;
        }
    
        if (req.query.group) {
            queryJSON.group = req.query.group;
        }
    }

    return queryJSON;
}

module.exports = {
    queryItemPromise,
    getRequest
}