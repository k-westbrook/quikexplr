import React from 'react'

import {connect} from 'react-redux'
import {MainForm} from './main-form'
import {OptionsBar} from './options-bar'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Test} from './test.js'
import {Profile} from './profile.js'
import {CreateTripForm} from './create-trip.js'
import {RestaurantList} from './restaurant-list'
import {AttractionList} from './attraction-list'
/**
 * COMPONENT
 */
export const SinglePlace = props => {
  console.log(props)
  return (
    <div>
      <MainForm />
      <div className="user-box">
        <h3 className="title-home"> Meet {props.chosenLocation.name}</h3>
        <OptionsBar />

        <div className="single-view-box">
          <div className="left-view" />
          <div className="right-view">
            <div className="rest-box">
              <h4>Places to Eat</h4>
              <RestaurantList
                restaurants={props.chosenLocation.restaurants}
                className="rest-list"
              />
            </div>
            <div className="attraction-box">
              <h4>Things to See and Do</h4>
              <AttractionList
                attractions={props.chosenLocation.attractions}
                className="attraction-list"
              />
            </div>
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
    email: state.user.email,
    consent: state.user.hasConsent,
    location: state.location.userLocation,
    chosenLocation: state.location.chosenDestination
  }
}

export default connect(mapState)(SinglePlace)
