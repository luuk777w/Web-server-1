const express = require('express');
const hbs =require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view enigne', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('upperCase', (text) => {

    return text.toUpperCase();

});

app.get('/', (req, res) => {

    res.render('home.hbs', {

        pageTitle: 'Home',
        welcomeMessage: 'Hey, welkom op de home site!',

    });

});

app.get('/about', (req, res) => {

    res.render('about.hbs', {

        pageTitle: 'About page',

    });

});

app.get('/swag', (req, res) => {

    res.send({

        errorMessage: 'Er ging iets mis. :('

    });

});

app.listen(3000, () => {

    console.log('server started.');

});


