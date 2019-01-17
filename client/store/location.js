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
    const ip = await axios.get('/api/location/ip')
    console.log(ip, 'ip')
    const res = await axios.get(
      `https://api.ipstack.com/${ip.data}?access_key=${process.env.IPSTACK_KEY}`
    )
    dispatch(getLocation(res.data || userLocation))
    console.log(res.data, 'RETURNED')
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
