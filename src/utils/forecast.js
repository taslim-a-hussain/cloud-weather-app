const request = require('request');

function forecast(weatherOption, callback) {
    request(weatherOption, (error, response) => {
        const cur = response.body.currently;
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location ' + response.body.error, undefined);
        } else {
            callback(undefined, {
                summary: cur.summary,
                current_temp: Math.round(cur.temperature),
                current_precipProb: cur.precipProbability
            });
        }
    });
}


module.exports = forecast;