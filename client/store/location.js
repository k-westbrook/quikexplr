import axios from 'axios'
import {getCity} from './destinationUtils'

/**
 * ACTION TYPES
 */
const GET_LOCATION = 'GET_LOCATION'
const GET_DESTINATION = 'GET_DESTINATION'
const REMOVE_CHOICE = 'REMOVE_CHOICE'
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

export const removeChoice = () => ({type: REMOVE_CHOICE})
/**
 *
 *
 * THUNK CREATORS
 */
export const getLocationThunk = () => async dispatch => {
  try {
    let attempts = 0
    let sameCity = false
    const res = await axios.get('/api/location')
    const lat = res.data.latitude
    const long = res.data.longitude
    let cities = await axios.post('api/location/cities', {lat, long})
    dispatch(getLocation(res.data))
    let attractionArr = cities.data.results.items

    while (attractionArr.length === 0 && attempts < 5) {
      console.log('there was no match')
      cities = await axios.post('api/location/cities', {lat, long})
      attempts++
    }
    let chosenCityCoord
    if (attempts === 5 && attractionArr.length === 0) {
      chosenCityCoord = {
        latitude: lat,
        longitude: long
      }
      sameCity = true
    } else {
      chosenCityCoord = getCity(attractionArr[0])
    }

    let chosenCityName
    let chosenStateName
    const restaurantsResponse = await axios.post('/api/location/restaurants', {
      lat: chosenCityCoord.latitude,
      long: chosenCityCoord.longitude
    })
    const restaurants = restaurantsResponse.data.businesses

    if (!sameCity) {
      const attractionAddress = attractionArr[0].vicinity
      let findIndexStart = attractionAddress.indexOf('>')
      let findIndexEnd = attractionAddress.indexOf(',')

      chosenCityName = attractionAddress.slice(findIndexStart + 1, findIndexEnd)
      chosenStateName = attractionAddress.slice(
        findIndexEnd + 2,
        findIndexEnd + 4
      )
      if (
        chosenCityName === res.data.city &&
        chosenStateName === res.data.region_name
      ) {
        attractionArr = []
        chosenCityName = res.data.city
        chosenStateName = res.data.region_name
      }
    } else {
      attractionArr = []
      chosenCityName = res.data.city
      chosenStateName = res.data.region_name
    }

    const chosenDestination = {
      coordinates: chosenCityCoord,
      name: chosenCityName,
      state: chosenStateName,
      attractions: attractionArr,
      restaurants
    }
    await axios.post('/api/location/addDestination/', chosenDestination)

    dispatch(getDestination(chosenDestination))
  } catch (err) {
    console.error(err)
  }
}

export const getChosenDestinationThunk = () => async dispatch => {
  try {
    const chosenDestination = await axios.get('/api/location/chosenDestination')

    dispatch(getDestination(chosenDestination.data))
  } catch (error) {
    console.log(error)
  }
}

export const removeChoiceThunk = () => async dispatch => {
  try {
    const chosenDestination = await axios.delete(
      '/api/location/chosenDestination'
    )

    dispatch(removeChoice(chosenDestination.data))
  } catch (error) {
    console.log(error)
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
    case REMOVE_CHOICE:
      console.log('MADE IT')
      return {...state, chosenDestination: {}}
    default:
      return state
  }
}
