const router = require('express').Router();
const controller = require('./controller');

router.get('/getBookings', controller.bookings.get);
router.post('/createBooking', controller.bookings.post)

module.exports = router;