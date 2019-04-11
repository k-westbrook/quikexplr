const router = require('express').Router()
const ipstack = require('ipstack')
const request = require('request')

module.exports = router

router.post('/', async (req, res, next) => {
  const {lat, long} = req.body

  let apiKey = process.env.OPENWEATHER_KEY
  let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`
  request(url, function(err, response, body) {
    if (err) {
      console.log(err)
    } else {
      console.log('NON PARSED', body)
      let weather = JSON.parse(body)
      res.json(weather)
    }
  })
})
