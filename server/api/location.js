const router = require('express').Router()
const ipstack = require('ipstack')
const request = require('request')
// const NodeGeocoder = require('node-geocoder');

// const options = {
//   provider: 'MapQuest',

//   httpAdapter: 'https',
//   apiKey: 'process.env.MAP_QUEST_KEY'
// };

// const geocoder = NodeGeocoder(options);

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const clientIP = req.clientInfo.ip
    await ipstack(clientIP, process.env.IPSTACK_KEY, (err, response) => {
      try {
        res.json(response)
      } catch (error) {
        next(err)
      }
    })
  } catch (err) {
    next(err)
  }
})

router.post('/cities', async (req, res, next) => {
  try {
    const {lat, long} = req.body

    let newLong = Math.random() * 4 + 1
    newLong *= Math.random() * 2 - 1

    let newLat = Math.random() * 4 + 1
    newLat = Math.random() * 2 - 1

    let url = `https://places.cit.api.here.com/places/v1/discover/around?&app_id=${
      process.env.HERE_APP_ID
    }&app_code=${process.env.HERE_APP_CODE}&in=${lat + newLat},${long +
      newLong};r=20000&cat=outdoor-recreation,leisure,landmark-attraction&drilldown=true&size=10`

    request(url, function(err, response, body) {
      if (err) {
        console.log(err)
      } else {
        console.log(body)
        const citiesList = JSON.parse(body)

        res.json(citiesList)
      }
    })
  } catch (err) {
    next(err)
  }
})

// router.post('/chosenCity', async (req, res, next) => {
//   try {
//     const { lat, long } = req.body

//     const cityName = await geocoder.reverse({ lat, long })
//     res.json(cityName)
//   } catch (err) {
//     next(err)
//   }

// })
