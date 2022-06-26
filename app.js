const app = require('./index');
const port = process.env.PORT || '3000';

app.get('/', (req, res) => {
    res.send('This is your captain speaking.');
});

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
