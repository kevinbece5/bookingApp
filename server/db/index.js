const mysql = require('mysql');
const moment = require('moment');
const faker = require('faker');
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
        await db.queryAsync('DROP TABLE IF EXISTS bookings.bookings');
        await db.queryAsync('CREATE TABLE IF NOT EXISTS bookings.bookings(id INT AUTO_INCREMENT PRIMARY KEY, date VARCHAR(255), name VARCHAR(255), email VARCHAR(255), address VARCHAR(255), city VARCHAR(255), state VARCHAR(255), zipcode VARCHAR(255), type VARCHAR(255) )')
        await seed();
    } catch (err) {
        throw { setupErr: err };
    }

}

const randomNum = (range) => Math.floor(Math.random() * range + 1);

const seed = async () => {
    for (let i = 0; i < 150; i++) {
        let date = moment().startOf('day').add(randomNum(40), 'days').add(randomNum(23), 'hours').add(randomNum(59), 'minutes').format();
        let name = faker.name.findName();
        let email = faker.internet.email();
        let address = faker.address.streetAddress();
        let city = faker.address.city();
        let state = faker.address.state();
        let zipcode = faker.address.zipCode();
        let type = randomNum(2) === 2 ? 'dogWalking' : 'houseKeeping';
        await db.queryAsync(`INSERT INTO bookings.bookings (date, name, email, address, city, state, zipcode, type) VALUES ("${date}", "${name}", "${email}", "${address}", "${city}",  "${state}", "${zipcode}", "${type}" )`)
    }
}



module.exports = { setup, db };
