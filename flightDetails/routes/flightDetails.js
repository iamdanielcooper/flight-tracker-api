const express = require('express');
const router = express.Router();

const flightDetailsController = require('../controller/flightDetails');

router.get('/random', flightDetailsController.getRandomFlightDetails);
router.get('/:flightNumber', flightDetailsController.getFlightDetailsByFlightNumber);

module.exports = router;
