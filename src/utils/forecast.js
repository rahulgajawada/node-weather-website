const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5486d3e4f1fb39c6be05e6ba589f5160&query='+latitude+','+longitude+'&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error)
            callback('Unable to connect to the internet', undefined)
        else if(body.error)
            callback('Invalid coordinates have been provided', undefined)
        else{
            const data = body.current.weather_descriptions[0] + " : It is currently " + body.current.temperature + " degrees out. It feels like it is " + body.current.feelslike + " degrees out. The humidity is " + body.current.humidity + "%. There is a " + body.current.precip +"% chance of rain."
            callback(undefined,data)
        }
    })
}

module.exports = forecast