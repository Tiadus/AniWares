const insertUserPromise = (userName, userEmail, userPassword, isAdmin, pool) => {
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

module.exports = {
    insertUserPromise
}