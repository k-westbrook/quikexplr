const router = require('express').Router()
const {Trip, Destination, Restaurant, Attraction} = require('../db/models')

module.exports = router

router.get('/addTrip', async (req, res, next) => {
  try {
    const {recentDestinationId} = req.session

    await Destination.update(
      {
        userId: req.session.userId
      },
      {
        where: {
          id: recentDestinationId
        }
      }
    )

    const addedTrip = await Destination.find({
      where: {id: recentDestinationId}
    })
    req.session.recetDestinationId = null
    res.json(addedTrip)
  } catch (err) {
    next(err)
  }
})

router.get('/tripList', async (req, res, next) => {
  try {
    const {userId} = req.session

    const newTrip = await Destination.findAll({
      where: {userId}
    })

    res.json(newTrip)
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

router.get('/getTrip/:destinationId', async (req, res, next) => {
  try {
    if (req.session.userId) {
      const destinationId = req.params.destinationId

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
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/removeTrip', async (req, res, next) => {
  try {
    const {tripId} = req.body
    const removedTrip = await Destination.destroy({
      where: {id: tripId}
    })

    res.json(removedTrip)
  } catch (err) {
    next(err)
  }
})
