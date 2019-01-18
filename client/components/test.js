import React from 'react'
import {Button} from '@material-ui/core/Button'
import {getLocationThunk} from '../store/location'
import {getWeatherThunk} from '../store/weather'
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
    let restaurant = []
    if (this.props.restaurants) {
      restaurant = this.props.restaurants
    }

    return (
      <div>
        <h1>Test</h1>
        <Button type="submit" onClick={this.onSubmit}>
          Test Button
        </Button>
        <h2>
          Your location: {this.props.location.city}{' '}
          {this.props.location.region_code}
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
        <h2>
          You might want to try out: {this.props.chosenLocation.name},{' '}
          {this.props.chosenLocation.state}
        </h2>
        {restaurant.map(element => {
          return (
            <div key={element.id}>
              <a href={element.url} target="_blank">
                {element.name}
              </a>
            </div>
          )
        })}
        {/* <h2>Try this restaurant: {this.props.chosenLocation.restaurants[0].name}</h2> */}
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    location: state.location.userLocation,
    chosenLocation: state.location.chosenDestination,
    restaurants: state.location.chosenDestination.restaurants,
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
