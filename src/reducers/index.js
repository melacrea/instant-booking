import { combineReducers } from 'redux'
import currentUser from '../scenes/User/reducer'
import bookings from '../scenes/Bookings/reducer'
export default combineReducers({
  currentUser,
  bookings
})