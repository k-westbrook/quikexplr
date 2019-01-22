const Sequelize = require('sequelize')
const db = require('../db')

const Destination = db.define('destination', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  stayCation: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Destination
