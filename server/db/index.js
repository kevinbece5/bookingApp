const mysql = require('mysql');
const bluebird = require('bluebird');
var dbConnection = mysql.createConnection({
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || ''
});


const db = bluebird.promisifyAll(dbConnection);

const setup = async () => {
    try {
        await db.connectAsync();
        await db.queryAsync(`CREATE DATABASE IF NOT EXISTS bookings`)
        await db.queryAsync('CREATE TABLE IF NOT EXISTS bookings.bookings(id INT AUTO_INCREMENT PRIMARY KEY, date VARCHAR(255), name VARCHAR(255), email VARCHAR(255), address VARCHAR(255), city VARCHAR(255), state VARCHAR(255), zipcode VARCHAR(255), type VARCHAR(255) )')
    } catch (err) {
        throw { setupErr: err };
    }

}



module.exports = { setup, db };
