import React from 'react'

import {connect} from 'react-redux'
import {MainForm} from './main-form'
import {OptionsBar} from './options-bar'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Test} from './test.js'
import {Profile} from './profile.js'
import {CreateTripForm} from './create-trip.js'
import {getTripListThunk, removeTripThunk} from '../store/trip'
import {ChosenCardMini} from './chosen-card-mini'

/**
 * COMPONENT
 */
class TripList extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getTrips()
  }

  removeTrip(tripId) {
    console.log(tripId, 'ON F()')
    this.props.removeTrip(tripId)
  }

  render() {
    return (
      <div>
        <MainForm />
        <div className="user-box">
          <h4 className="title-home">My old trips!</h4>
          <OptionsBar />
          {this.props.trips.map(trip => {
            return (
              <div key={trip.id}>
                <p>{trip.id}</p>
                <ChosenCardMini chosenLocation={trip} />
                <button type="submit" onClick={() => this.removeTrip(trip.id)}>
                  XRemove
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    trips: state.trip.trips
  }
}

const mapDispatch = dispatch => {
  return {
    removeTrip: tripId => dispatch(removeTripThunk(tripId)),
    getTrips: () => dispatch(getTripListThunk())
  }
}

export default connect(mapState, mapDispatch)(TripList)
