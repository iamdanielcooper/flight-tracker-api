const puppeteer = require('puppeteer');

const getElementText = async (page, selector) => {
    const element = await page.waitForSelector(selector);
    return await element.evaluate(el => el.textContent.trim());
};

const getFlightDetails = async flightNumber => {
    const url = 'https://uk.flightaware.com/live/flight/' + flightNumber;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    // let consent = await page.$(".flightPageSummaryCity")
    // .$("button")[0]
    // console.log(consent.getProperties);

    const flightInfo = {};

    flightInfo.status = await getElementText(page, '.flightPageSummaryStatus');
    // flightInfo.flightCode = await getElementText(page, "tbc");
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
        flightInfo.milesRemaining = await getElementText(
            page,
            '#flightPageTourStep1 > div.flightPageProgressContainer > div.flightPageProgressDistance > span.flightPageProgressDistanceRemaining.flightPageProgressDistanceDesc > strong'
        );
        // const percentComplete = await getElementText(page, "tbc");
    } else {
        flightInfo.milesFlown = null;
        flightInfo.milesRemaining = null;
        flightInfo.percentComplete = 1;
    }

    flightInfo.departureTime = await getElementText(
        page,
        '#flightPageTourStep1 > div.flightPageSummaryTimes > div.flightPageSummaryOrigin > span.flightPageSummaryDeparture.flightTime'
    );
    flightInfo.arrivalTime = await getElementText(
        page,
        '#flightPageTourStep1 > div.flightPageSummaryTimes > div.flightPageSummaryDestination > span.flightPageSummaryArrival.flightTime > em'
    );
    await browser.close();

    return flightInfo;
};

module.exports = { getFlightDetails };
