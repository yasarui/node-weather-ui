require("dotenv").config();
const request = require('request');
const apiConstansts = require('../apiconstants');

const getWeather = (lat, lng, loc) => {
    return new Promise((resolve, reject) => {
        const weatherStackApi = apiConstansts.weatherStackApi(lat, lng)
        request({
            url: weatherStackApi,
            json: true
        }, (err, response, {
            current: {
                weather_descriptions,
                temperature,
                feelslike
            },
            error: forcastError
        }) => {
            if (err) {
                reject("Unable to reach the api")
            } else if (forcastError) {
                reject(forcastError.info);
            } else {
              resolve(`${weather_descriptions[0]} It is currently ${temperature} degrees out. It is feels like ${feelslike}`)
            }
        })
    })
}

module.exports = getWeather