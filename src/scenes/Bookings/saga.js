import { put, takeLatest, call } from 'redux-saga/effects';

import { axiosInstantBooking, handleError } from '../../utils/api';

export const fetchBookings = async () => {
  const bearer = `Bearer ${localStorage.getItem('jwt_token')}`;
  const response = await axiosInstantBooking.get('/bookings', { headers: { 'Authorization': bearer } });
  return response;
};

export const postBooking = async data => {
  const bearer = `Bearer ${localStorage.getItem('jwt_token')}`;
  const response = await axiosInstantBooking.post('/bookings', data, { headers: { 'Authorization': bearer } });
  return response;
};

export const deleteBooking = async data => {
  const bearer = `Bearer ${localStorage.getItem('jwt_token')}`;
  const response = await axiosInstantBooking.delete(`/bookings/${data.id}`, { headers: { 'Authorization': bearer } });
  return response;
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
    handleError(err);
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
    }else{
      yield put({
        type: 'ERROR_RECEIVED',
        payload: {message: err.response.data.message, type: 'error'}
      });
    }
    handleError(err);
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
    handleError(err);
  }
}

export function* bookingsWatcherSaga() {
  yield takeLatest('GET_BOOKINGS', fetchBookingsFlow);
  yield takeLatest('POST_BOOKING', postBookingFlow);
  yield takeLatest('DELETE_BOOKING', deleteBookingFlow);
}