const request = require('request');

function geoCode(geoLocaton, callback) {
    request(geoLocaton, (error, response) => {
        const data = response.body;  
         if (error) {
             callback('Unable to connect to location service!');
         } else if (data.features.length === 0) {
             callback('Unable to find location. Try another search.');
         } else {
             const codinates = {
             latitude: data.features[0].center[1],
             longitude: data.features[0].center[0],
             place: data.features[0].place_name
             };
         callback(undefined, codinates);
         }
        });
}

module.exports = geoCode;