const models = require('./models');
const moment = require('moment');

module.exports = {
    bookings: {
        get: async (req, res) => {
            try {
                const query = await models.bookings.get();
                if (!query) {
                    res.sendStatus(404);
                } else {
                    let sorted = query.sort((a, b) => {
                        return moment(a.date).format('YYYYMMDDHHmm') - moment(b.date).format('YYYYMMDDHHmm')
                    });
                    res.send(sorted)
                }
            } catch (err) {
                res.sendStatus(400);
            }
        },

        post: async (req, res) => {
            try {
                const body = req.body;
                if (body) {
                    await models.bookings.post(body);
                    res.sendStatus(200)
                } else {
                    res.sendStatus(418);
                }
            } catch (err) {
                res.sendStatus(400);
            }
        }
    }
}