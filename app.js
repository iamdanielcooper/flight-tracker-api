const app = require('./index');
const port = process.env.PORT || '3000';

app.get('/', (req, res) => {
    res.send('This is your captain speaking.');
});

const flightDetailsRouter = require('./flightDetails/routes/flightDetails')
app.use('/flightDetails', flightDetailsRouter)

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
