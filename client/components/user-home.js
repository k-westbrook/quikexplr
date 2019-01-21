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

        <p>photo</p>
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
