import axios from 'axios'
import {getCity} from './destinationUtils'
import {DH_CHECK_P_NOT_SAFE_PRIME} from 'constants'

/**
 * ACTION TYPES
 */
const GET_LOCATION = 'GET_LOCATION'
const GET_DESTINATION = 'GET_DESTINATION'

/**
 * INITIAL STATE
 */
const location = {
  userLocation: {},
  chosenDestination: {}
}

/**
 * ACTION CREATORS
 */
const getLocation = userLocation => ({type: GET_LOCATION, userLocation})
const getDestination = chosenDestination => ({
  type: GET_DESTINATION,
  chosenDestination
})
/**
 * THUNK CREATORS
 */
export const getLocationThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/location')
    const lat = res.data.latitude
    const long = res.data.longitude
    const cities = await axios.post('api/location/cities', {lat, long})
    dispatch(getLocation(res.data))
    const attractionArr = cities.data.results.items
    if (attractionArr.length === 0) {
      dispatch(getLocation(res.data))
    }

    const chosenCityCoord = getCity(attractionArr[0])

    const restaurantsResponse = await axios.post('/api/location/restaurants', {
      lat: chosenCityCoord.latitude,
      long: chosenCityCoord.longitude
    })
    const restaurants = restaurantsResponse.data.businesses

    const attractionAddress = attractionArr[0].vicinity
    let findIndexStart = attractionAddress.indexOf('>')
    let findIndexEnd = attractionAddress.indexOf(',')

    const chosenCityName = attractionAddress.slice(
      findIndexStart + 1,
      findIndexEnd
    )
    const chosenStateName = attractionAddress.slice(
      findIndexEnd + 2,
      findIndexEnd + 4
    )
    // const distanceInfo = await axios.post('/api/location/distance/', {
    //   chosenLat: chosenCityCoord.latitude,
    //   chosenLong: chosenCityCoord.longitude
    // });
    // const distance = distanceInfo.data;

    const chosenDestination = {
      coordinates: chosenCityCoord,
      name: chosenCityName,
      state: chosenStateName,
      attractions: attractionArr,
      restaurants
    }

    dispatch(getDestination(chosenDestination))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = location, action) {
  switch (action.type) {
    case GET_LOCATION:
      return {...state, userLocation: action.userLocation}
    case GET_DESTINATION:
      return {...state, chosenDestination: action.chosenDestination}
    default:
      return state
  }
}
