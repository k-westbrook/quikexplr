import axios from 'axios'
import {getClearAverage, getTempAverage, getRain, getSnow} from './utils'

/**
 * ACTION TYPES
 */
const GET_WEATHER = 'GET_WEATHER'

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

/**
 * THUNK CREATORS
 */
export const getWeatherThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/location')
    const weather = await axios.post(`/api/weather`, {
      city: res.data.city,
      country: res.data.country_code
    })

    const fiveDayForecast = weather.data.list
    console.log(fiveDayForecast)
    const weatherDataCompressed = {
      clearAverage: getClearAverage(fiveDayForecast),
      tempAverage: getTempAverage(fiveDayForecast),
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
    default:
      return state
  }
}
