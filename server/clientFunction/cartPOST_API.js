//The function is used to insert an item into the cart
const insertCartPromise = (userCode, itemCode, cartItemQuantity, pool) => {
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

//The function is used to update the quantity of an item in the user cart
const updateCartPromise = (userCode, itemCode, cartItemQuantity, pool) => {
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

module.exports = {
    insertCartPromise,
    updateCartPromise
}