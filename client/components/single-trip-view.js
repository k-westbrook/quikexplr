import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Link} from 'react-router-dom'
import {MainForm} from './main-form'
import {OptionsBar} from './options-bar'
import {RestaurantList} from './restaurant-list'
import {AttractionList} from './attraction-list'
import {getWeatherThunk, resetWeather} from '../store/weather'
import {getTripThunk, removeTripThunk, resetTrip} from '../store/trip'

/**
 * COMPONENT
 */
export class SingleTrip extends React.Component {
  constructor() {
    super()

    this.removeTrip = this.removeTrip.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.returnClick = this.returnClick.bind(this)
  }
  componentDidMount() {
    const tripId = this.props.match.params.tripId

    this.props.getTrip(tripId)
  }

  handleClick() {
    this.props.getWeather(
      this.props.trip.coordinates.latitude,
      this.props.trip.coordinates.longitude
    )
  }
  removeTrip(tripId) {
    const trip = {tripId, singleView: true}
    this.props.removeTrip(trip)
  }

  returnClick() {
    this.props.resetTrip()
    this.props.resetWeather()
    this.props.history.goBack()
  }

  render() {
    console.log(this.props, 'PROPS')
    const {trip} = this.props
    return (
      <div>
        {this.props.restaurants && (
          <div>
            <MainForm />
            <div className="user-box">
              <h3 className="title-home"> Welcome back to {trip.name}</h3>
              <OptionsBar />

              <div className="single-view-box">
                <div className="left-view">
                  <div className="weather-info">
                    {this.props.weather.clearAverage ? (
                      <div>
                        <h4>Weather Average for next 5 days</h4>
                        <p className="weather-lines">
                          <span className="weather-cat"> Average Temp: </span>{' '}
                          {this.props.weather.tempAverage.farenheit} F ({
                            this.props.weather.tempAverage.celsius
                          }{' '}
                          C)
                          <br />
                          <span className="weather-cat">
                            {' '}
                            Chance of Rain:
                          </span>{' '}
                          {this.props.weather.rainAverage.rainStrChance} <br />
                          <span className="weather-cat">
                            {' '}
                            Chance of Snow:
                          </span>{' '}
                          {this.props.weather.snowAverage.snowStrChance}
                          <br />
                          <span className="weather-cat">
                            {' '}
                            Clear Skies Percent:{' '}
                          </span>
                          {this.props.weather.clearAverage}%
                        </p>
                        {this.props.weather.rainAverage.extremeWeatherWarn ||
                          (this.props.weather.snowAverage
                            .extremeWeatherWarn && (
                            <div>
                              <p className="extreme-weather-warning">
                                Looking for adventure? This place might have
                                some intense weather conditions in the next few
                                days. Proceed with caution.
                              </p>
                            </div>
                          ))}
                        {this.props.weather.snowAverage.pleasantWinter && (
                          <div>
                            <p className="pleasant-winter-message">
                              Get ready to get cozy! A pleasant light snow fall
                              might occur!
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <h2 className="decision-blurb">
                          Click button for updated weather!
                        </h2>
                        <button
                          className="weather-button"
                          type="submit"
                          onClick={this.handleClick}
                        >
                          Get the Weather
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="decision-box">
                    <h2 className="decision-blurb">So, what do you think?</h2>
                    <div className="button-box">
                      <button
                        className="decision-button"
                        type="submit"
                        onClick={this.returnClick}
                      >
                        Return to My Trips
                      </button>

                      <button
                        className="decision-button"
                        type="submit"
                        onClick={() => this.removeTrip(trip.id)}
                      >
                        Remove this from my trips!
                      </button>
                    </div>
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
                  {!trip.sameCity ? (
                    <div className="attraction-box">
                      <h4>Things to See and Do</h4>
                      <AttractionList
                        attractions={this.props.attractions}
                        className="attraction-list"
                      />
                    </div>
                  ) : (
                    <div>
                      <h4>Stay in your town and explore</h4>
                      <AttractionList
                        attractions={this.props.attractions}
                        className="attraction-list"
                      />
                    </div>
                  )}
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
    trip: state.trip.selectedTrip,
    weather: state.weather,
    restaurants: state.trip.selectedTrip.restaurants,
    attractions: state.trip.selectedTrip.attractions
  }
}
const mapDispatch = (dispatch, ownProps) => {
  return {
    getWeather: (lat, long) => dispatch(getWeatherThunk(lat, long)),
    getTrip: id => dispatch(getTripThunk(id)),
    removeTrip: trip => dispatch(removeTripThunk(trip)),
    resetTrip: () => dispatch(resetTrip()),
    resetWeather: () => dispatch(resetWeather())
  }
}

export default connect(mapState, mapDispatch)(SingleTrip)
