import axios from 'axios'
import {
  getClearAverage,
  getTempAverage,
  getRain,
  getSnow,
  getCelsiusValue
} from './utils'

/**
 * ACTION TYPES
 */
const GET_WEATHER = 'GET_WEATHER'
const RESET_WEATHER = 'RESET_WEATHER'

/**
 * INITIAL STATE
 */
const cityWeather = {
  snowAverage: {},
  rainAverage: {}
}

/**
 * ACTION CREATORS
 */
const getWeather = weather => ({type: GET_WEATHER, weather})
export const resetWeather = () => ({type: RESET_WEATHER})

/**
 * THUNK CREATORS
 */
export const getWeatherThunk = (lat, long) => async dispatch => {
  try {
    console.log(lat, long)
    const weather = await axios.post(`/api/weather`, {
      lat,
      long
    })
    console.log('THUNK', weather.data)

    const fiveDayForecast = weather.data.list
    const farenheit = getTempAverage(fiveDayForecast)
    const celsius = getCelsiusValue(farenheit)
    const weatherDataCompressed = {
      clearAverage: getClearAverage(fiveDayForecast),
      tempAverage: {farenheit, celsius},
      rainAverage: getRain(fiveDayForecast),
      snowAverage: getSnow(fiveDayForecast)
    }

    dispatch(getWeather(weatherDataCompressed || cityWeather))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = cityWeather, action) {
  switch (action.type) {
    case GET_WEATHER:
      return action.weather
    case RESET_WEATHER:
      return {snowAverage: {}, rainAverage: {}}
    default:
      return state
  }
}
