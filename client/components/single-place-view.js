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
import {getChosenDestinationThunk} from '../store/location'
/**
 * COMPONENT
 */
export class SinglePlace extends React.Component {
  componentDidMount() {
    this.props.getGetChosenDestination()
  }

  render() {
    return (
      <div>
        {this.props.restaurants && (
          <div>
            <MainForm />
            <div className="user-box">
              <h3 className="title-home">
                {' '}
                Meet {this.props.chosenDestination.name}
              </h3>
              <OptionsBar />

              <div className="single-view-box">
                <div className="left-view" />
                <div className="right-view">
                  <div className="rest-box">
                    <h4>Places to Eat</h4>
                    <RestaurantList
                      restaurants={this.props.restaurants}
                      className="rest-list"
                    />
                  </div>
                  <div className="attraction-box">
                    <h4>Things to See and Do</h4>
                    <AttractionList
                      attractions={this.props.attractions}
                      className="attraction-list"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    restaurants: state.location.chosenDestination.restaurants,
    attractions: state.location.chosenDestination.attractions,
    location: state.location.userLocation,
    chosenDestination: state.location.chosenDestination
  }
}
const mapDispatch = dispatch => {
  return {
    getGetChosenDestination: () => dispatch(getChosenDestinationThunk())
  }
}

export default connect(mapState, mapDispatch)(SinglePlace)
