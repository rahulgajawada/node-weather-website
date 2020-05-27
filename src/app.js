const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rahul Gajawada'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rahul'
    })
})

app.get('/weather', (req, res)=> {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
     geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) =>{
            if(error)
                return res.send({error})
            res.send({
        
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
     })
     
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'YOLO HELP',
        name: 'Rahul'
    })
})

// app.get('/help/*', (req,res) => {
//     res.send('help article not found')
// }) 
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    })
})


// app.get('*', (req, res) => {
//     res.send('My 404 page')
// })
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
       errorMessage: 'Page not found' 
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})

