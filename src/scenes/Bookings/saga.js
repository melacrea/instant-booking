import { put, takeLatest, call } from 'redux-saga/effects';

import { axiosInstantBooking, handleError } from '../../utils/api';

export const fetchBookings = () => {
  const bearer = `Bearer ${localStorage.getItem('jwt_token')}`;
  return axiosInstantBooking.get('/bookings', {headers: { 'Authorization': bearer}})
    .then(response => response);
};

function* fetchBookingsFlow(action) {
  try {
    const response = yield call(fetchBookings, action.payload);
    if (response) {
      yield put({
        type: 'BOOKINGS',
        payload: response.data.data
      });
    }
  } catch (err) {
    if(err.response.status === 401){
      yield put({
        type: 'TOKEN_RECEIVED',
        payload: false
      });
    }
    //handleError(err);
  }
}

export function* bookingsWatcherSaga() {
  yield takeLatest('GET_BOOKINGS', fetchBookingsFlow);
}