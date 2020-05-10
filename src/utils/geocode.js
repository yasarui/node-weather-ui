require('dotenv').config();
const request = require('request');
const apiConstansts = require('../apiconstants');

const geoCode = (addr) => {
    return new Promise((resolve, reject) => {
        const mapBoxApi = apiConstansts.maxBoxApi(addr);
        request({
            url: mapBoxApi,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject("Unable to reach the api ");
            } else if (body.message) {
                reject(body.message);
            } else if (body.features.length == 0) {
                reject("Unable to fetch the coordinates for the given location");
            } else {
                const data = {
                    "Latitude": body.features[0].center[1],
                    "Longitude": body.features[0].center[0],
                    "Location": body.features[0].place_name
                }
                resolve(data);
            }
        })
    })
}

module.exports = geoCode;