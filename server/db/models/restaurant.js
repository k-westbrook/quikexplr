const Sequelize = require('sequelize')
const db = require('../db')

const Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  rating: {
    type: Sequelize.FLOAT
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Restaurant
