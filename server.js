// Creating an Express Server with NeDB Database
const express = require('express');
const Datastore = require('nedb');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

//
const app = express();
const apiKey = process.env.API_KEY;
const port = 3000;
app.listen(port, ()=> console.log(`The server is running on port ${port}`));
app.use(express.static('public'));
app.use(express.json( limit = '1mb'));
app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json());

//
const database = new Datastore('database.db');
database.loadDatabase();

// OpenWeatherMap API to gather temperature

app.get('/weather', async (req, res) => {
    const zip = req.query.zip;
    const country = `au`;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await axios.get(url);
      const temperature = response.data.main.temp;
      const location = response.data.name;
      res.send({ temperature, location });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching weather data');
    }
  });

// Database entry API

app.get("/entry_api", (request, response) => {
    database.find({}, (err, bundle) => {
      if (err) {
        response.end();
        return;
      }
      response.send(bundle);
    });
  });

app.post('/projectData', (request, response) => {
    const bundle = request.body;
    const timestamp = Date.now();
    bundle.timestamp = timestamp
    database.insert(bundle);
    response.json(bundle);
});