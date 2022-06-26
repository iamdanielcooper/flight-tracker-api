const express = require('express')
const router = express.Router()

const flightDetailsController = require('../controller/flightDetails');

router.get("/:flightNumber", flightDetailsController.getFlightDetailsByFlightNumber)

module.exports = router