require('dotenv').config();
module.exports = {
    maxBoxApi: addr => `https://api.mapbox.com/geocoding/v5/mapbox.places/${addr}.json?access_token=${process.env.MAP_BOX_TOKEN}`,
    weatherStackApi: (lat, lng) => `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STOCK_TOKEN}&query=${lat},${lng}`
}