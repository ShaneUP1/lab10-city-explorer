const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const { mungeLocation } = require('../utils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging





app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});


app.get('/location', async (req, res) => {
  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_IQ_KEY}&q=${req.query.search}&format=json`;

    const response = await request.get(URL);
    console.log(response.body);
    const newResponse = mungeLocation(response.body);

    res.json(newResponse);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
