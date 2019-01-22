const router = require('express').Router()
const ipstack = require('ipstack')
const request = require('request')
const {Destination, Attraction, Restaurant} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const clientIP = req.clientInfo.ip
    await ipstack(
      '172.254.159.106',
      process.env.IPSTACK_KEY,
      (err, response) => {
        try {
          req.session.userLocation = response

          res.json(response)
        } catch (error) {
          next(err)
        }
      }
    )
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
      newLong};r=20000&cat=outdoor-recreation,leisure,landmark-attraction&drilldown=true&size=5`

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

    let url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&term=restaurant&sort_by=rating&limit=5`

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

router.post('/addDestination/', async (req, res, next) => {
  try {
    const {
      coordinates,
      name,
      state,
      attractions,
      restaurants,
      sameCity
    } = req.body

    const newDestination = await Destination.create({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      name,
      state,
      userId: null,
      stayCation: sameCity
    })

    for (let i = 0; i < attractions.length; i++) {
      await Attraction.create({
        title: attractions[i].title,
        latitude: attractions[i].position[0],
        longitude: attractions[i].position[1],
        destinationId: newDestination.id
      })
    }

    for (let i = 0; i < restaurants.length; i++) {
      await Restaurant.create({
        name: restaurants[i].name,
        latitude: restaurants[i].coordinates.latitude,
        longitude: restaurants[i].coordinates.longitude,
        rating: restaurants[i].rating,
        url: restaurants[i].url,
        destinationId: newDestination.id
      })
    }
    req.session.recentDestinationId = newDestination.id

    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.get('/chosenDestination', async (req, res, next) => {
  try {
    const destinationId = req.session.recentDestinationId

    const destinationInfo = await Destination.find({
      where: {
        id: destinationId
      }
    })
    const coordinates = {
      latitude: destinationInfo.latitude,
      longitude: destinationInfo.longitude
    }

    const restaurants = await Restaurant.findAll({
      where: {
        destinationId
      }
    })

    const attractions = await Attraction.findAll({
      where: {
        destinationId
      }
    })

    const chosenDestination = {
      coordinates,
      name: destinationInfo.name,
      state: destinationInfo.state,
      attractions,
      restaurants,
      sameCity: destinationInfo.stayCation
    }

    res.json(chosenDestination)
  } catch (err) {
    next(err)
  }
})

router.delete('/chosenDestination', async (req, res, next) => {
  try {
    const destinationId = req.session.recentDestinationId

    await Destination.destroy({
      where: {
        id: destinationId
      }
    })

    await Restaurant.destroy({
      where: {
        destinationId
      }
    })

    await Attraction.destroy({
      where: {
        destinationId
      }
    })

    req.session.recentDestinationId = null

    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
router.post('/getActivities', async (req, res, next) => {
  try {
    const {lat, long} = req.body

    let url = `https://places.cit.api.here.com/places/v1/discover/around?&app_id=${
      process.env.HERE_APP_ID
    }&app_code=${
      process.env.HERE_APP_CODE
    }&in=${lat},${long};r=20000&cat=outdoor-recreation,leisure,landmark-attraction&drilldown=true&size=5`

    request(url, function(err, response, body) {
      if (err) {
        console.log(err)
      } else {
        const attractionsList = JSON.parse(body)
        console.log(attractionsList, 'STAUCAT')
        res.json(attractionsList)
      }
    })
  } catch (err) {
    next(err)
  }
})
