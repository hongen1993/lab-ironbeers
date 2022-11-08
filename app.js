const express = require('express')

const hbs = require('hbs')
const path = require('path')
const PunkAPIWrapper = require('punkapi-javascript-wrapper')

const app = express()
const punkAPI = new PunkAPIWrapper()
const PORT = 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers)
      res.render('beers', { beers })
    })
    .catch(error => console.log(error));
})

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log({ randomBeer })
      res.render('random-beers', { randomBeer })
    })
    .catch(error => console.log(error));
})

app.listen(PORT, () => console.log(`🏃‍ on port ${PORT}`))
