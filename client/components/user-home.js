import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {MainForm} from './main-form'
import {OptionsBar} from './options-bar'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Test} from './test.js'
import {Profile} from './profile.js'
import {CreateTripForm} from './create-trip.js'
import {TripList} from './trip-list.js'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <MainForm />
      <div className="user-box">
        <h4 className="title-home">Let's travel {props.email}!</h4>
        <OptionsBar />
        <div>
          <div>
            <p className="information-page">
              Welcome to QuikExplr! The purpose of this web app is to find your
              location using your public IP address and find a location, ANY
              location, for you to check out. It is random and might suggest
              that you stay in your own town. It gives average weather for the
              next 5 days. For more in-depth weather information, please refer
              to other resources.
            </p>
            <p className="information-page">
              Attractions and restaurants are also highlighted in the location's
              information display. The restaurants are linked to the
              corresponding yelp websites. The attractions are not linked to any
              specific point as of now and are meant to highlight possible
              things to do. You can either accept the trip and add it to your
              trips and say no thanks and get another trip. Once you are
              finished with the trip, you can simply remove it off your list.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
