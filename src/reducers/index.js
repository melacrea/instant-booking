import { combineReducers } from 'redux';

import currentUser from '../scenes/User/reducer';
import users from '../scenes/Users/reducer';
import bookings from '../scenes/Bookings/reducer';
import resource from '../scenes/Resource/reducer';

export default combineReducers({
  currentUser,
  bookings,
  resource,
  users
});