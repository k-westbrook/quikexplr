import React from 'react'

import {connect} from 'react-redux'
import {MainForm} from './main-form'
import {OptionsBar} from './options-bar'
import {withRouter, Route, Switch, Link} from 'react-router-dom'
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
    this.props.removeTrip(tripId)
  }

  render() {
    return (
      <div>
        <MainForm />
        <div className="user-box">
          <h4 className="title-home">My old trips!</h4>
          <OptionsBar />
          <div className="trip-instruction">
            <h3>Click on your saved trips for info!</h3>
          </div>
          <div className="trip-list">
            {this.props.trips.map(trip => {
              return (
                <div className="list-item" key={trip.id}>
                  <ChosenCardMini chosenLocation={trip} />

                  <div className="trip-remove">
                    <button
                      type="submit"
                      onClick={() => this.removeTrip(trip.id)}
                    >
                      XRemove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
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
