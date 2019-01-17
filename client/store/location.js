import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_LOCATION = 'GET_LOCATION'

/**
 * INITIAL STATE
 */
const userLocation = {}

/**
 * ACTION CREATORS
 */
const getLocation = location => ({type: GET_LOCATION, location})

/**
 * THUNK CREATORS
 */
export const getLocationThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/location')

    const lat = res.data.latitude
    const lo = res.data.longitude
    const weather = await axios.get(
      `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lo}`
    )
    // const weather = await axios.get(`https://api.weather.gov/points/${lat},${lo}`)
    console.log(weather)
    dispatch(getLocation(res.data || userLocation))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = userLocation, action) {
  switch (action.type) {
    case GET_LOCATION:
      return action.location
    default:
      return state
  }
}
