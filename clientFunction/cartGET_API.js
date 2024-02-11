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