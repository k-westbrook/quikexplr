import React from 'react'
import {getLocationThunk} from './store/location'
import {getWeatherThunk} from './store/weather'
import {connect} from 'react-redux'

class Test extends React.Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    this.props.getLocationThunk()
    this.props.getWeatherThunk()
  }
  render() {
    return (
      <div>
        <h1>Test</h1>
        <button type="submit" onClick={this.onSubmit}>
          Test Button
        </button>
        <h2>
          Your location: {this.props.location.city} {this.props.location.state}{' '}
        </h2>
        <h2>Avg Chance of Clear Skies {this.props.weather.clearAverage}%</h2>
        <h2>Avg Temp for the next 5 days: {this.props.weather.tempAverage}</h2>
        <h2>
          Will it snow in the next few days?:{' '}
          {this.props.weather.snowAverage.snowStrChance}
        </h2>
        <h2>
          Will it rain in the next few days?{' '}
          {this.props.weather.rainAverage.rainStrChance}
        </h2>
        {(this.props.weather.rainAverage.extremeWeatherWarn ||
          this.props.weather.snowAverage.extremeWeatherWarn) && (
          <h3>
            On average, there could be an intense weather condition in the next
            five days.
          </h3>
        )}
        {this.props.weather.snowAverage.pleasantWinter && (
          <h3>Chance for a pleasant light snow</h3>
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
    location: state.location,
    weather: state.weather
  }
}

const mapDispatch = dispatch => {
  return {
    getLocationThunk() {
      dispatch(getLocationThunk())
    },
    getWeatherThunk() {
      dispatch(getWeatherThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Test)
