const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const apiKey = process.env.API_KEY;
const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=3&`;
const axios = require('axios');
const cors = require('cors');

app.use(cors({
    origin: 'https://weather-app-production-7322.up.railway.app'
}));

//Defining a route example
app.get('/', (req, res) =>
{
    res.send('Hello, Express');
});


app.get('/api/weather', async (req, res) =>{
    
    const lat = req.query.lat;
    const lon = req.query.lon;
    if(!lat || !lon)
    {
        return res.status(400).json({error: 'Latitude and Longitude parameters are required.'});
    }
    
    try{
        const data = await fetchWeatherData(lat, lon);

        res.json(data);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({error: 'An error occurred while fetching weather data'});
    }
});


async function fetchWeatherData(lat, long)
{
    const url = apiUrl + `q=${lat},${long}`;
    try
    {
        const response = await axios.get(url);
        return response.data;
    }
    catch(error)
    {
        throw error;
    }
}

//Starting the server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});


