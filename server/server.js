//Import 
const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//Import Function
const {queryItemPromise, getRequest} = require('./clientFunction/itemAPI.js');
const {
    queryAccountInformationPromise,
    queryAccountOrderPromise,
    queryAccountLoginPromise,
    queryUserNamePromise,
    queryUserEmailPromise
} = require('./clientFunction/accountGET_API.js');
const {insertUserPromise} = require('./clientFunction/accountPOST_API.js');
const {queryOrderPromise, queryOrderDetailPromise} = require('./clientFunction/orderGET_API.js');
const {createOrderCode, processPaymentPromise} = require('./clientFunction/orderPOST_API.js');
const {queryItemCartPromise, queryCartPromise} = require('./clientFunction/cartGET_API.js');
const {insertCartPromise, updateCartPromise} = require('./clientFunction/cartPOST_API.js');
const {queryAdminOrderPromise, queryAdminOrderDetailPromise, updateAdminOrderPromise} = require('./adminFunction/adminAPI.js');

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

var imagesDir = path.join(__dirname, 'images');
app.use(express.static(imagesDir));

// ITEM_API 
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
            queryJSON.group,
            pool
        );

    databaseResult
    .then(result => {
        res.json(result);
    })
    .catch(error => {
        res.json({error: "An error has occured, please contact admin! Error: " + error});
    });
});

// ITEM_API 
app.get('/search', function(req,res) {
    let queryJSON = getRequest(req);
    Promise.all(
        [
            queryItemPromise(
                queryJSON.search, queryJSON.brandValue, queryJSON.categoryValue, queryJSON.typeValue,
                queryJSON.scaleValue, queryJSON.seriesValue, queryJSON.nameValue, queryJSON.minPriceValue,
                queryJSON.maxPriceValue, queryJSON.discountValue, queryJSON.statusValue, queryJSON.group, pool
            ),
            queryItemPromise(
                queryJSON.search, queryJSON.brandValue, queryJSON.categoryValue, queryJSON.typeValue,
                queryJSON.scaleValue, queryJSON.seriesValue, queryJSON.nameValue, queryJSON.minPriceValue,
                queryJSON.maxPriceValue, queryJSON.discountValue, queryJSON.statusValue, "itemBrand", pool
            ),
            queryItemPromise(
                queryJSON.search, queryJSON.brandValue, queryJSON.categoryValue, queryJSON.typeValue,
                queryJSON.scaleValue, queryJSON.seriesValue, queryJSON.nameValue, queryJSON.minPriceValue,
                queryJSON.maxPriceValue, queryJSON.discountValue, queryJSON.statusValue, "itemCategory", pool
            ),
            queryItemPromise(
                queryJSON.search, queryJSON.brandValue, queryJSON.categoryValue, queryJSON.typeValue,
                queryJSON.scaleValue, queryJSON.seriesValue, queryJSON.nameValue, queryJSON.minPriceValue,
                queryJSON.maxPriceValue, queryJSON.discountValue, queryJSON.statusValue, "itemType", pool
            ),
            queryItemPromise(
                queryJSON.search, queryJSON.brandValue, queryJSON.categoryValue, queryJSON.typeValue,
                queryJSON.scaleValue, queryJSON.seriesValue, queryJSON.nameValue, queryJSON.minPriceValue,
                queryJSON.maxPriceValue, queryJSON.discountValue, queryJSON.statusValue, "itemScale", pool
            ),
            queryItemPromise(
                queryJSON.search, queryJSON.brandValue, queryJSON.categoryValue, queryJSON.typeValue,
                queryJSON.scaleValue, queryJSON.seriesValue, queryJSON.nameValue, queryJSON.minPriceValue,
                queryJSON.maxPriceValue, queryJSON.discountValue, queryJSON.statusValue, "itemSeries", pool
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

// ACCOUNT_API
app.get('/account/:user?', (req,res) => {
    const userID = req.params.user;
    Promise.all([
        queryAccountInformationPromise(userID, pool),
        queryAccountOrderPromise(userID, pool)
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
        console.log(error);
        res.json({error: error});
    })

});

// ACCOUNT_API
app.post('/api/login', (req, res) => {
    let body = req.body;
    if (!body.loginCredential || !body.password) {
        return;
    }

    let loginCredential = body.loginCredential;
    let password = body.password;
    queryAccountLoginPromise(`%${loginCredential}%`, password, pool)
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

// ACCOUNT_API
app.post('/api/register', (req,res) => {
    let body = req.body;
    if (!body.userName || !body.userEmail || !body.userPassword) {
        return;
    }

    let userName = body.userName;
    let userEmail = body.userEmail;
    let userPassword = body.userPassword;

    Promise.all([
        queryUserNamePromise(userName, pool),
        queryUserEmailPromise(userEmail, pool)
    ])
    .then(results => {
        if (results[0].length > 0) {
            return res.json({error: 1})
        }

        if (results[1].length > 0) {
            return res.json({error: 2})
        }

        insertUserPromise(userName, userEmail, userPassword, false, pool)
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

// ORDER_API
app.get('/order', (req,res) => {
    const orderID = req.query.oid;
    Promise.all(
        [
            queryOrderPromise(orderID, pool),
            queryOrderDetailPromise(orderID, pool)
        ]
    )
    .then(results => {
        res.json({
            order: results[0][0],
            orderItems: results[1]
        })
    })
    .catch(dbError => {
        console.log(dbError);
        const error = new Error("Internal Server Error");
        error.status = 500;
        res.status(error.status).json({error: error.message})
    })
})

// CART_API
app.get('/cart/:user?', (req,res) => {
    const userID = req.params.user;
    queryItemCartPromise(userID, pool)
    .then(result => {
        res.json(result);
    })
    .catch(error => {
        res.json(error);
    });
})

// CART_API
app.post('/api/addCart', (req,res) => {
    let body = req.body;
    if (body === undefined) {
        return;
    }
    let userCode = body.userCode;
    let itemCode = body.itemCode;

    let queryCart = queryCartPromise(userCode,itemCode, pool);
    queryCart.then(result => {
        if (result.length === 0) {
            insertCartPromise(userCode, itemCode, 1, pool)
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
            updateCartPromise(userCode, itemCode, newCartItemQuantity, pool)
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

// CART_API
app.post('/api/updateCart', (req,res) => {
    let body = req.body;
    if (body === undefined) {
        return;
    }

    if (body.fromAddCart == false) {
        let userCode = body.userCode;
        let itemCode = body.itemCode;
        let cartItemQuantity = body.cartItemQuantity;
        updateCartPromise(userCode, itemCode, cartItemQuantity, pool)
        .then(message => {
            res.json({message: message});
        })
        .catch(error => {
            console.log(error);
        });

    }
})

// ORDER_API
app.post('/api/checkoutCart', (req,res) => {
    let body = req.body;
    if (body === undefined || body.userCode === undefined) {
        return;
    }

    let userCode = body.userCode;
    let orderCode = createOrderCode();
    let name = body.name;
    let email = body.email;
    let address = body.address;
    let city = body.city;
    let state = body.state;
    let pCode = body.pCode;

    let checkoutCart = processPaymentPromise(userCode, orderCode, name, email, address, city, state, pCode, pool);
    checkoutCart
    .then(result => {
        console.log(result);
        res.json({message: result});
    })
    .catch(dbError => {
        console.log(dbError);
        const error = new Error("Internal Server Error: Contact Admin");
        error.status = 500;
        res.status(error.status).json({error: error.message});
    })
})

// ADMIN_API
app.get('/api/admin/orderView', (req,res) => {
    if (req.query.userCode === undefined) {
        return res.json({message: "Unavailable"});
    }

    let orderCode = req.query.orderCode;

    if (orderCode === undefined) {
        console.log("Order Code Not Available");
        return res.json({message: "Unavailable"}); 
    }

    queryAccountInformationPromise(req.query.userCode, pool)
    .then(result => {
        if (result[0].isAdmin === 1) {
            queryAdminOrderPromise(orderCode, pool)
            .then(result => {
                res.json(result);
            })
            .catch(error => {
                console.log(error);
            })
        }
    })
    .catch(error => {
        console.log(error);
    })
})

// ADMIN_API
app.get('/api/admin/orderDetail', (req,res) => {
    const orderID = req.query.oid;
    Promise.all(
        [
            queryAdminOrderPromise(orderID, pool),
            queryAdminOrderDetailPromise(orderID, pool)
        ]
    )
    .then(results => {
        res.json({
            order: results[0][0],
            orderItems: results[1]
        })
    })
    .catch(dbError => {
        console.log(dbError);
        const error = new Error("Internal Server Error");
        error.status = 500;
        res.status(error.status).json({error: error.message})
    })
})

// ADMIN_API
app.post('/api/admin/manageOrder', (req,res) => {
    let body = req.body;
    if (!('userCode' in body) || !('orderCode' in body) || !('orderStatus' in body)) {
        const error = new Error("Wrong Parameter");
        error.status = 500;
        return res.status(error.status).json({error: error.message});
    }
    let userCode = body.userCode;
    let orderCode = body.orderCode;
    let orderStatus = body.orderStatus;

    updateAdminOrderPromise(userCode, orderCode, orderStatus, pool)
    .then(result => {
        if (result.affectedRows === 0) {
            const error = new Error("No Update Occur");
            error.status = 500;
            return res.status(error.status).json({error: error.message});
        }

        res.json({message: "Update Succeed"});
    })
    .catch(dbError => {
        console.log(dbError);
        const error = new Error("Internal Server Error");
        error.status = 500;
        return res.status(error.status).json({error: error.message});
    })
})

app.listen(4000, function() {
    console.log("Listening on port 4000");
});