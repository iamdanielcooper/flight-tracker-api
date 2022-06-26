const FlightDetails = require('../model/flightDetails');

const getFlightDetailsByFlightNumber = async (req, res) => {
    const flightDetails = await FlightDetails.getFlightDetails(req.params.flightNumber);

    // TODO add error handling.
    res.status(200).send(flightDetails);
};

module.exports = { getFlightDetailsByFlightNumber };
