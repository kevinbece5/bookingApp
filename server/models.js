const mysql = require('./db').db
const moment = require('moment');

module.exports = {
    bookings: {
        get: async () => {
            try {
                return await mysql.queryAsync('SELECT * FROM bookings.bookings');
            } catch (err) {
                throw err;
            }
        },

        post: async (body) => {
            const { date, name, email, address, city, state, zipcode, type, time } = body;
            const scheduledDate = moment(date).startOf('day').add(time.slice(0, 2), 'hours').add(time.slice(3), 'minutes').format();
            try {
                return await mysql.queryAsync(`INSERT INTO bookings.bookings (date, name, email, address, city, state, zipcode, type) VALUES ('${scheduledDate}', '${name}', '${email}', '${address}', '${city}',  '${state}', '${zipcode}', '${type}' )`)
            } catch (err) {
                throw err;
            }
        }
    },

}