const router = require('express').Router()
const ipstack = require('ipstack')
const request = require('request')

module.exports = router

router.post('/', async (req, res, next) => {
  const {city, country_code} = req.body

  let apiKey = '48f52744023d2822c0dc7e4697b0de4f'
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country_code}&units=imperial&appid=${apiKey}`
  request(url, function(err, response, body) {
    if (err) {
      console.log(err)
    } else {
      let weather = JSON.parse(body)
      res.json(weather)
    }
  })
})
