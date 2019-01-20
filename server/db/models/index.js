const User = require('./user')
const Destination = require('./destination')
const Restaurant = require('./restaurant')
const Attraction = require('./attraction')

User.hasMany(Destination)

Destination.hasMany(Restaurant)
Destination.hasMany(Attraction)

module.exports = {
  User,
  Destination,
  Restaurant,
  Attraction
}
