import axios from 'axios'
import history from '../history'
import {removeChoice} from '../store/location'
/**
 * ACTION TYPES
 */

const ADD_TRIP = 'ADD_TRIP'
const GET_TRIP_LIST = 'GET_TRIP_LIST'
const REMOVE_TRIP = 'REMOVE_TRIP'
const GET_TRIP = 'GET_TRIP'

/**
 * INITIAL STATE
 */
const defaultTripList = {
  trips: [],
  selectedTrip: {}
}

/**
 * ACTION CREATORS
 */
const getTripList = trips => ({type: GET_TRIP_LIST, trips})
const removeTrip = tripId => ({type: REMOVE_TRIP, tripId})
const addTrip = trip => ({type: ADD_TRIP, trip})
const getTrip = trip => ({type: GET_TRIP, trip})

/**
 * THUNK CREATORS
 */
export const addTripThunk = () => async dispatch => {
  try {
    const res = await axios.get('api/trips/addTrip')
    dispatch(addTrip(res.data))
    dispatch(removeChoice())
    history.push('/myTrips')
  } catch (err) {
    console.error(err)
  }
}

export const getTripListThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/trips/tripList')
    dispatch(getTripList(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const getTripThunk = tripId => async dispatch => {
  try {
    const res = await axios.get(`/api/trips/getTrip/${tripId}`)

    dispatch(getTrip(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const removeTripThunk = trip => async dispatch => {
  try {
    const tripId = trip.tripId

    await axios.put('/api/trips/removeTrip', {tripId: tripId})

    dispatch(removeTrip(tripId))

    if (trip.singleView) {
      history.push('/myTrips')
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultTripList, action) {
  switch (action.type) {
    case GET_TRIP_LIST:
      return {...state, trips: action.trips}
    case ADD_TRIP:
      return {...state, trips: [...state.trips, action.trip]}
    case REMOVE_TRIP: {
      let newArr = []
      state.trips.forEach(trip => {
        if (trip.id !== action.tripId) {
          newArr.push(trip)
        }
      })
      return {...state, trips: newArr, selectedTrip: {}}
    }
    case GET_TRIP:
      return {...state, selectedTrip: action.trip}
    default:
      return state
  }
}
