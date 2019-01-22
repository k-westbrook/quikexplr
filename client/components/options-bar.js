import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Test from './test'

/**
 * COMPONENT
 */
export const OptionsBar = props => {
  return (
    <div className="options-container">
      <Link to="/myTrips" className="option-choice">
        <p className="option-text">My Trips</p>
      </Link>
      <Link to="/home" className="option-choice">
        <p className="option-text">Information</p>
      </Link>
      <Link to="/getNewTrip" className="option-choice">
        <p className="option-text">Start New Trip!</p>
      </Link>
    </div>
  )
}
