const FlightDetails = require('../model/flightDetails');

const getFlightDetailsByFlightNumber = async (req, res) => {
    try {
        const flightDetails = await FlightDetails.getFlightDetails(req.params.flightNumber);
        // TODO add error handling.
        res.status(200).send(flightDetails);
    } catch (error) {
        res.status(400).send('error');
    }
};

const getRandomFlightDetails = async (req, res) => {
    try {
        const flightDetails = await FlightDetails.getFlightDetails();
        // TODO add error handling.
        res.status(200).send(flightDetails);
    } catch (error) {
        res.status(400).send('error');
    }
};

module.exports = { getFlightDetailsByFlightNumber, getRandomFlightDetails };
