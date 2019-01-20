const User = require('./user')
const Desination = require('./destination')
const Restaurant = require('./restaurant')
const Attraction = require('./attraction')

User.hasMany(Desination)

Desination.hasMany(Restaurant)
Desination.hasMany(Attraction)

module.exports = {
  User,
  Desination,
  Restaurant,
  Attraction
}
