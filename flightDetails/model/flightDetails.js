const { getFlightDetails } = require('../datasource/flightDetails');

class FlightDetails {
    constructor(data) {
        this.status = data.status;
        this.flightCode = data.flightCode;
        this.departedCity = data.departedCity;
        this.departedName = data.departedName.split(' -')[0];
        this.departedCode = data.departedCode;
        this.destinationCity = data.destinationCity;
        this.destinationName = data.destinationName.split(' -')[0];
        this.destinationCode = data.destinationCode;
        this.flightTime = data.flightTime.replace(' total travel time', '');
        this.milesFlown = data.milesFlown;
        this.milesRemaining = data.milesRemaining;
        this.totalFlightDistance = data.totalFlightDistance;
        this.percentComplete = data.percentComplete;
        this.departureTime = data.departureTime;
        this.arrivalTime = data.arrivalTime;
        this.formattedFlightInformation = `${this.flightCode}: ${this.departedCity} -> ${this.destinationCity}`;
    }

    static create(flightInfo) {
        return new FlightDetails(flightInfo);
    }

    static async getFlightDetails(flightNumber) {
        try {
            const flightDetails = await getFlightDetails(flightNumber);
            return FlightDetails.create(flightDetails);
        } catch (error) {
            return 'something went wrong. Try another flight code';
        }
    }
}

module.exports = FlightDetails;
