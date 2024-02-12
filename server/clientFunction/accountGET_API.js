//This function querry the database for a user based on the userCode, if no user return with reject
const queryAccountInformationPromise = (userCode, pool) => {
    return new Promise(function (resolve,reject) {
        const sql = 'SELECT * FROM SHOP_USER WHERE userCode = ?';
        pool.query(sql, [userCode], (error, result) => {
            if (error) {
                return reject(error);
            }

            if (result.length === 0) {
                return reject("No User");
            }

            resolve(result);
        })
    })
}

//This function query the database to get a list of orders of a user based on the userCode
const queryAccountOrderPromise = (userCode, pool) => {
    return new Promise(function (resolve,reject) {
        let queryValue = [userCode]
        const sql = 'SELECT * FROM USER_ORDER WHERE userCode = ? ORDER BY orderCode DESC';
        pool.query(sql, queryValue, (error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result);
        })
    })
}

//This function query the database with the loginCredential and password, if there is a matched result this mean that the user exist and login proceeds
const queryAccountLoginPromise = (loginCredential, password, pool) => {
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

//This function query the database to get the information based on userName. Used to check whether a userName exist in the database for register purpose
const queryUserNamePromise = (userName, pool) => {
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

//This function query the database to get the information based on userEmail. Used to check whether a user email exist in the database for register purpose
const queryUserEmailPromise = (userEmail, pool) => {
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

module.exports = {
    queryAccountInformationPromise,
    queryAccountOrderPromise,
    queryAccountLoginPromise,
    queryUserNamePromise,
    queryUserEmailPromise
}