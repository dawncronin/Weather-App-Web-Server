const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGF3bmNyb25pbiIsImEiOiJja2dqc2F1cTYwdTFiMnpuc2Y3OGEwemVvIn0.HpV2djEIl_V0fqBOXobnrA`

    request({ url , json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services", undefined)
        } else if (!body.features[0]) {
            callback("Unable to find location. Try another serach", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode