import { put, takeLatest, take, call } from 'redux-saga/effects';

import { axiosInstantBooking, handleError } from '../../utils/api';

export const fetchBookings = () => {
  const bearer = `Bearer ${localStorage.getItem('jwt_token')}`;
  return axiosInstantBooking.get('/bookings', {headers: { 'Authorization': bearer}})
    .then(response => response);
};

export const postBooking = data => {
  const bearer = `Bearer ${localStorage.getItem('jwt_token')}`;
  return axiosInstantBooking.post('/bookings', data, {headers: { 'Authorization': bearer}})
    .then(response => response);
};

export const deleteBooking = data => {
  const bearer = `Bearer ${localStorage.getItem('jwt_token')}`;
  return axiosInstantBooking.delete(`/bookings/${data.id}`, {headers: { 'Authorization': bearer}})
    .then(response => response);
};

function* fetchBookingsFlow() {
  try {
    const response = yield call(fetchBookings);
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

function* postBookingFlow(action) {
  try {
    const response = yield call(postBooking, action.payload);
    if (response) {
      yield call(fetchBookingsFlow);
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

function* deleteBookingFlow(action) {
  try {
    const response = yield call(deleteBooking, action.payload);
    if (response) {
      yield call(fetchBookingsFlow);
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
  yield takeLatest('POST_BOOKING', postBookingFlow);
  yield takeLatest('DELETE_BOOKING', deleteBookingFlow);
}