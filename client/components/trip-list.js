import React from 'react'

import {connect} from 'react-redux'
import {MainForm} from './main-form'
import {OptionsBar} from './options-bar'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Test} from './test.js'
import {Profile} from './profile.js'
import {CreateTripForm} from './create-trip.js'

/**
 * COMPONENT
 */
export const TripList = props => {
  console.log(props)
  return (
    <div>
      <MainForm />
      <div className="user-box">
        <h4 className="title-home">My old trips!</h4>
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

export default connect(mapState)(TripList)