const FlightDetails = require('../model/flightDetails')

const getFlightDetailsByFlightNumber = (req, res) => {
    const flightDetails =
        FlightDetails.getFlightDetails(req.params.flightNumber);
        
    // TODO add error handling.
    res.status(200).send(flightDetails)
}

module.exports = {getFlightDetailsByFlightNumber}