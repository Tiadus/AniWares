//This function is used to get the current user cart and all the item in it to display on page Cart
const queryItemCartPromise = (userID, pool) => {
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

//This function is used to check whether an item is currently in the user cart.
//Used when the frontend need to check whether it should add the item to the cart or increment the quantity of the item in the cart by one
const queryCartPromise = (userID, itemCode, pool) => {
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

module.exports = {
    queryItemCartPromise,
    queryCartPromise
}