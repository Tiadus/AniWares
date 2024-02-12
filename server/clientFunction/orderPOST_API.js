//This function create an order code based on the current server time
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

//This function process the payment of a user when a payment is made successfully on the front end.
//It call the proceed_payment procedure stored in the database which insert a new order in USER_ORDER,
//then move the item in the current user cart to ORDER_ITEM
const processPaymentPromise = (userCode, orderCode, name, email, address, city, state, pCode, pool) => {
    return new Promise((resolve,reject) => {
        let sql = "CALL proceed_payment(?, ?, ?, ?, ?, ?, ?, ?)";
        let queryValue = [userCode, orderCode, name, email, address, city, state, pCode];
        pool.query(sql, queryValue, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve("Operation Process Payment Complete!");
        })
    })
}

module.exports = {
    createOrderCode,
    processPaymentPromise
}