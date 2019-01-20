const Sequelize = require('sequelize')
const db = require('../db')

const Attraction = db.define('attraction', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  }
})

module.exports = Attraction
