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

const queryItemPromise = (search, itemBrand, itemCategory, itemType, itemScale, itemSeries, itemName, minPrice, maxPrice, discount, status) => {
    return new Promise(function(resolve,reject) {
        let sql = `SELECT * FROM ITEM `;
        let queryValue = [];

        const searchValue = `WHERE CONCAT(itemBrand, itemCategory, itemType, itemScale, itemSeries, itemName) LIKE ? `;
        sql += searchValue;
        queryValue.push(search);
        
        if (itemBrand !== "") {
            const brandQueryValue = itemBrand.map(() => "?").join(",");
            const brandValue = `AND itemBrand IN (${brandQueryValue}) `;
            sql += brandValue;
            for (var i = 0; i < itemBrand.length; i++) {
                queryValue.push(itemBrand[i]);
            }
        }

        if (itemCategory !== "") {
            const categoryQueryValue = itemCategory.map(() => "?").join(",");
            const categoryValue = `AND itemCategory IN (${categoryQueryValue}) `;
            sql += categoryValue;
            for (var i = 0; i < itemCategory.length; i++) {
                queryValue.push(itemCategory[i]);
            }
        }

        if (itemType !== "") {
            const typeQueryValue = itemType.map(() => "?").join(",");
            const typeValue = `AND itemType IN (${typeQueryValue}) `;
            sql += typeValue;
            for (var i = 0; i < itemType.length; i++) {
                queryValue.push(itemType[i]);
            }
        }

        if (itemScale !== "") {
            const scaleQueryValue = itemScale.map(() => "?").join(",");
            const scaleValue = `AND itemType IN (${scaleQueryValue}) `;
            sql += scaleValue;
            for (var i = 0; i < itemScale.length; i++) {
                queryValue.push(itemScale[i]);
            }
        }

        if (itemSeries !== "") {
            const seriesQueryValue = itemSeries.map(() => "?").join(",");
            const seriesValue = `AND itemType IN (${seriesQueryValue}) `;
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

        pool.query(sql, queryValue, (error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result);
        })
    });
}

app.get('/item', function(req,res) {
    let search = `%${""}%`
    let brandValue = "";
    let categoryValue = "";
    let typeValue = "";
    let scaleValue = "";
    let seriesValue = "";
    let nameValue = "";
    let minPriceValue = 0;
    let maxPriceValue = 1000000;
    let discountValue = false;
    let statusValue = "";
    
    if (req.query) {
        search = `%${req.query.search}%`
        brandValue = req.query.brandValue;
        categoryValue = req.query.categoryValue;
        typeValue = req.query.typeValue;
        scaleValue = req.query.scaleValue;
        seriesValue = req.query.seriesValue;
        nameValue = req.query.nameValue;
        minPriceValue = req.query.minPriceValue;
        maxPriceValue = req.query.maxPriceValue;
        discountValue = req.query.discountValue; 
        statusValue = req.query.statusValue;
    }

    let databaseResult = 
        queryItemPromise(
            search,
            brandValue,
            categoryValue,
            typeValue,
            scaleValue,
            seriesValue,
            nameValue,
            minPriceValue,
            maxPriceValue,
            discountValue,
            statusValue
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