const path    = require('path');
const express = require('express');
const hbs     = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const viewsDir = path.join(__dirname, '../templates/views');

// Setup a Templating Engine (hbs)
app.set('view engine', 'hbs');
app.set('views', viewsDir);

// Setup hbs partials directory
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Taslim A Hussain'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a demo help message!'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
    return res.send({
    error: 'You must provide an address!'
    });
    }

    const darkskyAccessKey = '798639d09810df4d38ae59f6f54109ee';
    const mapboxAccessToken = 'pk.eyJ1IjoicmVsYXhtYW4iLCJhIjoiY2p5azZpeHJpMGJiMzNncHE3d3J1NDA1eCJ9.W1pC-t8ppVSYXyk1dwlf0A';

    function weatherOption(latitude, longitude, units = 'si') {
    const weatherUrl = 'https://api.darksky.net/forecast/'+ darkskyAccessKey + '/' + latitude + ',' + longitude + '?units=' + units;
    return {
    url: weatherUrl,
    json: true
    };
    }

    function geoOpt(place) {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(place) + '.json?access_token=' + mapboxAccessToken;
    return {
    url: geoUrl,
    json: true
    };
    }

    geocode(geoOpt(req.query.address), (error, codinate) => {
    if(error) {
    return res.send({
    error
    });
    }
    forecast(weatherOption(codinate.latitude, codinate.longitude), (error, data) => {
    if (error) {
    return res.send({
    error
    });  
    } 
    res.send({
    forecast: data.summary + '. It is currently ' + data.current_temp + ' degrees out. There is a ' + data.current_precipProb + '% chance of rain.',
    location: codinate.place,
    address: req.query.address
    });
    });

    });
});

app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        });
    }
    
    res.send({
        products: []
    });
});


app.get('*', (req, res) => {
    res.render('errors/notfound');
});


// Start the Server
app.listen(3000, () => {
    console.log('Server is up and running on port: ' + 3000);
});