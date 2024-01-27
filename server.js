//Import
const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');

//Required for body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Get root
app.get('/', function(req, res) {
    res.send("Welcome to the root path!");
});

//Create connection to mysql server
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ngaymai123',
    database: 'AniWARES',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

const queryItemPromise = (search, itemBrand, itemCategory, itemType, itemScale, itemSeries, itemName, minPrice, maxPrice, discount, status, group) => {
    return new Promise(function(resolve,reject) {
        let sql = `SELECT * FROM ITEM `;
        if (group !== "") {
            sql = `SELECT ${group}, COUNT(*) AS total FROM ITEM `;
        }
        let queryValue = [];

        const searchValue = `WHERE CONCAT(itemBrand, itemCategory, itemType, itemScale, itemSeries, itemName) LIKE ? `;
        sql += searchValue;
        queryValue.push(search);
        
        if (itemBrand[0] !== "") {
            const brandQueryValue = itemBrand.map(() => "?").join(",");
            const brandValue = `AND itemBrand IN (${brandQueryValue}) `;
            sql += brandValue;
            for (var i = 0; i < itemBrand.length; i++) {
                queryValue.push(itemBrand[i]);
            }
        }

        if (itemCategory[0] !== "") {
            const categoryQueryValue = itemCategory.map(() => "?").join(",");
            const categoryValue = `AND itemCategory IN (${categoryQueryValue}) `;
            sql += categoryValue;
            for (var i = 0; i < itemCategory.length; i++) {
                queryValue.push(itemCategory[i]);
            }
        }

        if (itemType[0] !== "") {
            const typeQueryValue = itemType.map(() => "?").join(",");
            const typeValue = `AND itemType IN (${typeQueryValue}) `;
            sql += typeValue;
            for (var i = 0; i < itemType.length; i++) {
                queryValue.push(itemType[i]);
            }
        }

        if (itemScale[0] !== "") {
            const scaleQueryValue = itemScale.map(() => "?").join(",");
            const scaleValue = `AND itemScale IN (${scaleQueryValue}) `;
            sql += scaleValue;
            for (var i = 0; i < itemScale.length; i++) {
                queryValue.push(itemScale[i]);
            }
        }

        if (itemSeries[0] !== "") {
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

app.get('/item', function(req,res) {
    let queryJSON = getRequest(req);

    let databaseResult = 
        queryItemPromise(
            queryJSON.search,
            queryJSON.brandValue,
            queryJSON.categoryValue,
            queryJSON.typeValue,
            queryJSON.scaleValue,
            queryJSON.seriesValue,
            queryJSON.nameValue,
            queryJSON.minPriceValue,
            queryJSON.maxPriceValue,
            queryJSON.discountValue,
            queryJSON.statusValue,
            queryJSON.group
        );

    databaseResult
    .then(result => {
        res.json(result);
    })
    .catch(error => {
        res.json({error: "An error has occured, please contact admin! Error: " + error});
    });
});

app.listen(4000, function() {
    console.log("Listening on port 4000");
});