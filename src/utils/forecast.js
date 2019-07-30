const request = require('request');

function forecast(weatherOption, callback) {
    request(weatherOption, (error, response) => {
        const body= response.body;
    
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location ' + response.body.error, undefined);
        } else {
            callback(undefined, {
                summary: body.currently.summary,
                current_temp: Math.round(body.currently.temperature),
                current_precipProb: body.currently.precipProbability,
                daily_summary: body.daily.summary
            });
        }
    });
}


module.exports = forecast;