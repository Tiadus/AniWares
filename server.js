//Import
const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
//const { default: App } = require('./client/src/App');

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

app.get('/search', function(req,res) {
    let queryJSON = getRequest(req);
    Promise.all(
        [
            queryItemPromise(
                queryJSON.search, queryJSON.brandValue, queryJSON.categoryValue, queryJSON.typeValue,
                queryJSON.scaleValue, queryJSON.seriesValue, queryJSON.nameValue, queryJSON.minPriceValue,
                queryJSON.maxPriceValue, queryJSON.discountValue, queryJSON.statusValue, queryJSON.group
            ),
            queryItemPromise(
                queryJSON.search, queryJSON.brandValue, queryJSON.categoryValue, queryJSON.typeValue,
                queryJSON.scaleValue, queryJSON.seriesValue, queryJSON.nameValue, queryJSON.minPriceValue,
                queryJSON.maxPriceValue, queryJSON.discountValue, queryJSON.statusValue, "itemBrand"
            ),
            queryItemPromise(
                queryJSON.search, queryJSON.brandValue, queryJSON.categoryValue, queryJSON.typeValue,
                queryJSON.scaleValue, queryJSON.seriesValue, queryJSON.nameValue, queryJSON.minPriceValue,
                queryJSON.maxPriceValue, queryJSON.discountValue, queryJSON.statusValue, "itemCategory"
            ),
            queryItemPromise(
                queryJSON.search, queryJSON.brandValue, queryJSON.categoryValue, queryJSON.typeValue,
                queryJSON.scaleValue, queryJSON.seriesValue, queryJSON.nameValue, queryJSON.minPriceValue,
                queryJSON.maxPriceValue, queryJSON.discountValue, queryJSON.statusValue, "itemType"
            ),
            queryItemPromise(
                queryJSON.search, queryJSON.brandValue, queryJSON.categoryValue, queryJSON.typeValue,
                queryJSON.scaleValue, queryJSON.seriesValue, queryJSON.nameValue, queryJSON.minPriceValue,
                queryJSON.maxPriceValue, queryJSON.discountValue, queryJSON.statusValue, "itemScale"
            ),
            queryItemPromise(
                queryJSON.search, queryJSON.brandValue, queryJSON.categoryValue, queryJSON.typeValue,
                queryJSON.scaleValue, queryJSON.seriesValue, queryJSON.nameValue, queryJSON.minPriceValue,
                queryJSON.maxPriceValue, queryJSON.discountValue, queryJSON.statusValue, "itemSeries"
            )
        ]
    ).then(results => {
        res.json(
            {
                items: results[0],
                brands: results[1],
                categories: results[2],
                types: results[3],
                scales: results[4],
                series: results[5]
            }
        )
    }).catch(error => {
        console.log(error);
    })
});

const queryAccountInformationPromise = (userCode) => {
    return new Promise(function (resolve,reject) {
        const sql = 'SELECT * FROM SHOP_USER WHERE userCode = ?';
        pool.query(sql, [userCode], (error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result);
        })
    })
}

const queryAccountOrderPromise = (userCode) => {
    return new Promise(function (resolve,reject) {
        const sql = 'SELECT * FROM USER_ORDER WHERE userCode = ? ORDER BY orderCode DESC'
        pool.query(sql, [userCode], (error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result);
        })
    })
}

app.get('/account/:user?', (req,res) => {
    const userID = req.params.user;
    Promise.all([
        queryAccountInformationPromise(userID),
        queryAccountOrderPromise(userID)
    ])
    .then(results => {
        res.json(
            {
                userInformation: results[0][0],
                userOrders: results[1]
            }
        );
    })
    .catch(error => {
        res.json({error: error});
    })

});

const queryAccountLoginPromise = (loginCredential, password) => {
    return new Promise ((resolve, reject) => {
        let queryValue = [loginCredential, password];
        const sql = 'SELECT * FROM SHOP_USER WHERE CONCAT(userName, userEmail) LIKE ? AND userPassword LIKE ?'
        pool.query(sql, queryValue, (error, result) => {
            if (error) {
                return reject(error);
            }

            if (result.length === 0) {
                return reject(404);
            }

            resolve(result);
        })
    })
}

app.post('/api/login', (req, res) => {
    let body = req.body;
    if (!body.loginCredential || !body.password) {
        return;
    }

    let loginCredential = body.loginCredential;
    let password = body.password;
    queryAccountLoginPromise(`%${loginCredential}%`, password)
    .then(result => {
        res.json({
            userCode: result[0].userCode,
            isAdmin: result[0].isAdmin
        })
    })
    .catch(error => {
        res.json({error: error});
    })
})

const queryUserNamePromise = (userName) => {
    return new Promise((resolve,reject) => {
        let queryValue = [userName];
        let sql = 'SELECT * FROM SHOP_USER WHERE userName LIKE ?';
        pool.query(sql,queryValue, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        })
    })
}

const queryUserEmailPromise = (userEmail) => {
    return new Promise((resolve,reject) => {
        let queryValue = [userEmail];
        let sql = 'SELECT * FROM SHOP_USER WHERE userEmail LIKE ?';
        pool.query(sql,queryValue, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        })
    })
}

const insertUserPromise = (userName, userEmail, userPassword, isAdmin) => {
    return new Promise((resolve, reject) => {
        let userCode = 0;
        let queryValue = [userCode, userName, userEmail, userPassword, isAdmin];
        let sql = "INSERT INTO SHOP_USER VALUES(?, ?, ?, ?, ?)";
        pool.query(sql, queryValue, (error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result.insertId);
        })
    })
}

app.post('/api/register', (req,res) => {
    let body = req.body;
    if (!body.userName || !body.userEmail || !body.userPassword) {
        return;
    }

    let userName = body.userName;
    let userEmail = body.userEmail;
    let userPassword = body.userPassword;

    Promise.all([
        queryUserNamePromise(userName),
        queryUserEmailPromise(userEmail)
    ])
    .then(results => {
        if (results[0].length > 0) {
            return res.json({error: 1})
        }

        if (results[1].length > 0) {
            return res.json({error: 2})
        }

        insertUserPromise(userName, userEmail, userPassword, false)
        .then(result => {
            res.json({
                userCode: result,
                isAdmin: 0
            })
        })
        .catch(error => {
            console.log(error);
            res.json({error: 5});
        });
    })
    .catch(error => {
        console.log(error);
    })
})

const queryOrderPromise = (orderID) => {
    return new Promise(function(resolve,reject) {
        const sql = 'SELECT * FROM ORDER_ITEM JOIN ITEM ON ORDER_ITEM.itemCode = ITEM.itemCode WHERE orderCode = ?';
        pool.query(sql, [orderID], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

app.get('/order', (req,res) => {
    const orderID = req.query.oid;
    queryOrderPromise(orderID)
    .then(result => {
        res.json(result);
    })
    .catch(error => {

    });
})

const queryItemCartPromise = (userID, itemCode) => {
    return new Promise(function(resolve,reject) {
        let queryValue = [];
        let sql = 'SELECT * FROM USER_CART JOIN ITEM ON USER_CART.itemCode = ITEM.itemCode WHERE userCode = ?';
        queryValue.push(userID);

        pool.query(sql, queryValue, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

const queryCartPromise = (userID, itemCode) => {
    return new Promise((resolve, reject) => {
        let queryValue = [userID, itemCode]
        let sql = 'SELECT * FROM USER_CART WHERE userCode = ? AND itemCode = ?';
        pool.query(sql, queryValue, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

app.get('/cart/:user?', (req,res) => {
    const userID = req.params.user;
    queryItemCartPromise(userID)
    .then(result => {
        res.json(result);
    })
    .catch(error => {
        res.json(error);
    });
})

const insertCartPromise = (userCode, itemCode, cartItemQuantity) => {
    return new Promise((resolve,reject) => {
        const sql = "INSERT INTO USER_CART VALUES(?, ?, ?)";
        pool.query(sql, [userCode, itemCode, cartItemQuantity], (error, result) => {
            if (error) {
                return reject(error);
            }
            if (result.affectedRows > 0) {
                resolve("Operation Insert Success");
            }
        }) 
    })
}

app.post('/api/addCart', (req,res) => {
    let body = req.body;
    if (body === undefined) {
        return;
    }
    let userCode = body.userCode;
    let itemCode = body.itemCode;

    let queryCart = queryCartPromise(userCode,itemCode);
    queryCart.then(result => {
        if (result.length === 0) {
            insertCartPromise(userCode, itemCode, 1)
            .then(message => {
                console.log(message);
                res.json({message: message});
            })
            .catch(error => {
                console.log(error);
                res.json({message: error});
            })
        }

        if (result.length > 0) {
            let oldCartItemQuantity = result[0].cartItemQuantity;
            let newCartItemQuantity = oldCartItemQuantity + 1;
            updateCartPromise(userCode, itemCode, newCartItemQuantity)
            .then(message => {
                console.log(message);
                res.json({message: message});
            })
            .catch(error => {
                console.log(error);
                res.json({message: error});
            });
        }
    })
})

const updateCartPromise = (userCode, itemCode, cartItemQuantity) => {
    return new Promise((resolve,reject) => {
        const sql = "UPDATE USER_CART SET cartItemQuantity = ? WHERE userCode = ? AND itemCode = ?";
        pool.query(sql, [cartItemQuantity, userCode, itemCode], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve("Operation Success");
        })
    })
}

app.post('/api/updateCart', (req,res) => {
    let body = req.body;
    if (body === undefined) {
        return;
    }

    if (body.fromAddCart == false) {
        let userCode = body.userCode;
        let itemCode = body.itemCode;
        let cartItemQuantity = body.cartItemQuantity;
        updateCartPromise(userCode, itemCode, cartItemQuantity)
        .then(message => {
            res.json({message: message});
        })
        .catch(error => {
            console.log(error);
        });

    }
})

const createOrderCode = () => {
    // Get the current date and time
    const currentDate = new Date();

    // Extract date and time components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hour = String(currentDate.getHours()).padStart(2, '0');
    const minute = String(currentDate.getMinutes()).padStart(2, '0');
    const second = String(currentDate.getSeconds()).padStart(2, '0');

    // Create the formatted string
    let formattedDateTime = `${year}${month}${day}${hour}${minute}${second}`;

    return formattedDateTime;
}

const processPaymentPromise = (userCode, orderCode) => {
    return new Promise((resolve,reject) => {
        let sql = "CALL proceed_payment(?, ?)";
        let queryValue = [userCode, orderCode];
        pool.query(sql, queryValue, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve("Operation Process Payment Complete!");
        })
    })
}

app.post('/api/checkoutCart', (req,res) => {
    let body = req.body;
    if (body === undefined) {
        return;
    }

    let userCode = body.userCode;
    let orderCode = createOrderCode();

    let checkoutCart = processPaymentPromise(userCode, orderCode);
    checkoutCart
    .then(result => {
        console.log(result);
        res.json({message: result});
    })
    .catch(error => {console.log(error)})
})

app.listen(4000, function() {
    console.log("Listening on port 4000");
});