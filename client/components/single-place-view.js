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
import {getWeatherThunk} from '../store/weather'

/**
 * COMPONENT
 */
export class SinglePlace extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getGetChosenDestination()
  }

  handleClick() {
    this.props.getWeather(
      this.props.chosenDestination.coordinates.latitude,
      this.props.chosenDestination.coordinates.longitude
    )
  }

  render() {
    const {weather} = this.props
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
                <div className="left-view">
                  <div className="weather-info">
                    {this.props.weather.clearAverage ? (
                      <div>
                        <h4>Weather Average for next 5 days</h4>
                        <p>Average Temp: {weather.tempAverage}</p>
                        <p>
                          Chance of Rain: {weather.rainAverage.rainStrChance}{' '}
                        </p>
                        <p>
                          Chance of Snow: {weather.snowAverage.snowStrChance}
                        </p>
                        <p>Clear Skies Percent: {weather.clearAverage}%</p>
                        {weather.rainAverage.extremeWeatherWarn ||
                          (weather.snowAverage.extremeWeatherWarn && (
                            <div>
                              Looking for adventure? This place might have some
                              intense weather conditions in the next few days.
                              Proceed with caution.
                            </div>
                          ))}
                        {weather.snowAverage.pleasantWinter && (
                          <div>
                            <p>
                              Get ready to get cozy! A pleasant snow fall might
                              occur!
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <button type="submit" onClick={this.handleClick}>
                          Get the Weather
                        </button>
                      </div>
                    )}
                  </div>
                </div>
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
    chosenDestination: state.location.chosenDestination,
    weather: state.weather
  }
}
const mapDispatch = dispatch => {
  return {
    getGetChosenDestination: () => dispatch(getChosenDestinationThunk()),
    getWeather: (lat, long) => dispatch(getWeatherThunk(lat, long))
  }
}

export default connect(mapState, mapDispatch)(SinglePlace)
