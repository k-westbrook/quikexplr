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
        <h2>
          Avg % Clouds for the next 5 days: {this.props.weather.cloudAverage}%
        </h2>
        <h2>Avg Temp for the next 5 days: {this.props.weather.tempAverage}</h2>
        <h2>Snow: {this.props.weather.snow}</h2>
        <h2>Rain: {this.props.weather.rain}</h2>
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
