const router = require('express').Router()
const ipstack = require('ipstack')
const request = require('request')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const clientIP = req.clientInfo.ip
    await ipstack('71.190.247.98', process.env.IPSTACK_KEY, (err, response) => {
      try {
        req.session.userLocation = response
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
        const citiesList = JSON.parse(body)

        res.json(citiesList)
      }
    })
  } catch (err) {
    next(err)
  }
})

router.post('/restaurants', async (req, res, next) => {
  try {
    const {lat, long} = req.body

    let url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&term=restaurant&sort_by=rating`

    const options = {
      url: url,
      headers: {
        Authorization: `Bearer ${process.env.YELP_API}`
      }
    }
    request(options, function(err, response, body) {
      if (err) {
        console.log(err)
      } else {
        const restaurants = JSON.parse(body)

        res.json(restaurants)
      }
    })
  } catch (err) {
    next(err)
  }
})

// router.post('/distance/', async (req, res, next) => {
//   try {
//     const userLocation = req.session.userLocation;
//     const userLat = userLocation.latitude;
//     const userLong = userLocation.longitude;
//     const { chosenLat, chosenLong } = req.body;

//     const url = `https://route.api.here.com/routing/7.2/calculateroute.json?app_id=${process.env.HERE_APP_ID}&app_code=${process.env.HERE_APP_CODE}&waypoint0=geo!${userLat},${userLong}&waypoint1=geo!${chosenLat},${chosenLong}&mode=fastest;car;traffic:disabled`
//     request(url, function (err, response, body) {
//       if (err) {
//         console.log(err)
//       } else {
//         const distanceInfo = JSON.parse(body)

//         res.json(distanceInfo)
//       }
//     })
//   } catch (err) {
//     next(err)
//   }
// })
