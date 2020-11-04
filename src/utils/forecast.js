const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b38590fe2dd6f2e0509f2053ff80b1f2&query=${latitude},${longitude}&units=f`

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            console.log('Unable to connect to weather service')
        } else if (body.error) {
            console.log('Unable to find location')
        } else { 
            callback(undefined, {
                forecast: body.current.weather_descriptions[0],
                temperature: body.current.temperature
            })
        }
    })
}

module.exports = forecast

