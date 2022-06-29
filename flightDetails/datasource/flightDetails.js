const puppeteer = require('puppeteer');

const getElementText = async (page, selector) => {
    const element = await page.waitForSelector(selector);
    return await element.evaluate(el => el.textContent.trim());
};

const getFlightCodeForNextDepartureFrom = async airportCode => {
    const url = 'https://uk.flightaware.com/live/airport/' + airportCode;

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);

    const nextFlightSelector = '#departures-board > div > table > tbody td.flight-ident';
    const nextDepartingFlight = await getElementText(page, nextFlightSelector);
    page.close();

    return nextDepartingFlight;
};

const getFlightDetails = async flightNumber => {
    const baseUrl = 'https://uk.flightaware.com/live/flight/';

    // If the user doesn't pass a flight number, get the next departure from selected airport.
    let url;
    if (!flightNumber) {
        const trackedAirports = ['EGLL'];
        const airport = trackedAirports[Math.floor(Math.random() * trackedAirports.length)];
        flightNumber = await getFlightCodeForNextDepartureFrom(airport);
    }
    url = baseUrl + flightNumber;

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);

    const flightInfo = {};

    //TODO - Error handling.
    // - does the page return an error.
    // - is some of the data we're trying to find missing.
    // - Get the flights status and then return the relevant data

    flightInfo.status = await getElementText(page, '.flightPageSummaryStatus');
    flightInfo.flightCode = flightNumber;
    flightInfo.departedCity = await getElementText(page, '.flightPageSummaryCity');
    flightInfo.departedName = await getElementText(page, '.flightPageSummaryAirportLink');
    flightInfo.departedCode = await getElementText(page, '.flightPageSummaryAirportLink strong');
    flightInfo.destinationCity = await getElementText(page, '.destinationCity');
    flightInfo.destinationName = await getElementText(
        page,
        '.flightPageSummaryDestination .flightPageSummaryAirportLink'
    );
    flightInfo.destinationCode = await getElementText(
        page,
        '.flightPageSummaryDestination .flightPageSummaryAirportLink strong'
    );
    flightInfo.flightTime = await getElementText(page, '.flightPageProgressTotal');

    if (!flightInfo.status.includes('Landed')) {
        flightInfo.milesFlown = await getElementText(
            page,
            '#flightPageTourStep1 > div.flightPageProgressContainer > div.flightPageProgressDistance > span.flightPageProgressDistanceElapsed.flightPageProgressDistanceDesc > strong'
        );

        flightInfo.milesFlown = flightInfo.milesFlown.replace(' mi', '');
        flightInfo.milesFlown = flightInfo.milesFlown.replace(',', '');
        flightInfo.milesFlown = parseInt(flightInfo.milesFlown);

        flightInfo.milesRemaining = await getElementText(
            page,
            '#flightPageTourStep1 > div.flightPageProgressContainer > div.flightPageProgressDistance > span.flightPageProgressDistanceRemaining.flightPageProgressDistanceDesc > strong'
        );

        flightInfo.milesRemaining = flightInfo.milesRemaining.replace(' mi', '');
        flightInfo.milesRemaining = flightInfo.milesRemaining.replace(',', '');
        flightInfo.milesRemaining = parseInt(flightInfo.milesRemaining);

        flightInfo.totalFlightDistance = flightInfo.milesFlown + flightInfo.milesRemaining;

        flightInfo.percentComplete = Math.ceil((flightInfo.milesFlown / flightInfo.totalFlightDistance) * 100);
    } else {
        flightInfo.milesFlown = null;
        flightInfo.milesRemaining = null;
        flightInfo.percentComplete = 1;
    }

    flightInfo.departureTime = await getElementText(
        page,
        '#flightPageTourStep1 > div.flightPageSummaryTimes > div.flightPageSummaryOrigin > span.flightPageSummaryDeparture.flightTime'
    );

    flightInfo.departureTime = flightInfo.departureTime
        .replace(/(\r\n|\n|\r|\t)/gm, '')
        .replace(/(?<=\d{2}:\d{2}).*/, '');

    flightInfo.arrivalTime = await getElementText(
        page,
        '#flightPageTourStep1 > div.flightPageSummaryTimes > div.flightPageSummaryDestination > span.flightPageSummaryArrival.flightTime > em'
    );

    flightInfo.arrivalTime = flightInfo.arrivalTime.replace(/(\r\n|\n|\r|\t)/gm, '').replace(/(?<=\d{2}:\d{2}).*/, '');

    await browser.close();

    return flightInfo;
};

module.exports = { getFlightDetails };
