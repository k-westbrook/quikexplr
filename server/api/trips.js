const router = require('express').Router()
const {Trip, Destination} = require('../db/models')

module.exports = router

router.get('/addTrip', async (req, res, next) => {
  try {
    const {recentDestinationId} = req.session

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
