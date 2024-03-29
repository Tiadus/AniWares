//The function is used to get a list of order of a user
const queryOrderPromise = (orderCode, pool) => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM USER_ORDER WHERE orderCode LIKE ?';
        pool.query(sql, [orderCode], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        })
    })
} 

//The function is used to get the list of item of an order
const queryOrderDetailPromise = (orderID , pool) => {
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

module.exports = {
    queryOrderPromise,
    queryOrderDetailPromise
}