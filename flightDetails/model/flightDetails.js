class FlightDetails {
    constructor() {
     this.status = "en route",
     this.flightCode = "DC2812",
     this.departedCity = "London"
     this.departedName = "Heathrow",
     this.departedCode = "LHR"
     this.destinationCity = "New York City",
     this.destinationName = "John F. Kennedy Airport",
     this.destinationCode = "JFK"
     this.flightTime = 1234,
     this.milesFlown = 123,
     this.milesRemaining = 123,
     this.percentComplete = .5,
     this.departureTime = "05:21",
     this.arrivalTime = "09:30"
    }

    static getFlightDetails(flightNumber) {
        return `Thanks for requesting flight ${flightNumber}`
    }
}

module.exports = FlightDetails;