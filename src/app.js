const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config
const htmlPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlesbards engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(htmlPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dawn'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "Dawn"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        message: "Do you need help? Type in a location to get started..."
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })            
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error }) 
            }
            
            res.send({
                location: location,
                forecast: `It is currently ${forecastData.temperature} degrees and ${forecastData.forecast}`,
                requestedAddress: req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'dawn',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dawn',
        errorMessage: 'Choose from an option above'
    })
})

app.listen(port)

