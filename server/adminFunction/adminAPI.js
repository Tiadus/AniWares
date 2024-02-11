const queryAdminOrderPromise = (orderCode, pool) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM USER_ORDER';
        let queryValue = [];
    
        if (orderCode !== "") {
            sql += " WHERE orderCode = ?";
            queryValue.push(orderCode);
        } else if (orderCode === "") {
            sql += " Where orderStatus = 1";
        }
    
        sql += " ORDER BY orderCode DESC";
        pool.query(sql, queryValue, (error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result);
        })
    })
}

const queryAdminOrderDetailPromise = (orderID, pool) => {
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

const updateAdminOrderPromise = (userCode, orderCode, orderStatus, pool) => {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE USER_ORDER SET orderStatus = ? WHERE userCode = ? AND orderCode = ?';
        let queryValue = [orderStatus, userCode, orderCode];
        pool.query(sql, queryValue, (error, result) => {
            if (error => {
                return reject(error);
            })

            resolve(result);
        })
    })
}

module.exports = {
    queryAdminOrderPromise,
    queryAdminOrderDetailPromise,
    updateAdminOrderPromise
}