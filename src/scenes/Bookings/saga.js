import { put, takeLatest, call } from 'redux-saga/effects';
import { axiosInstantBookingWithAuth, handleError } from '../../utils/api';

export const fetchBookings = () => {
    return axiosInstantBookingWithAuth.get('/bookings')
        .then(response => response)
}

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
      handleError(err)
    }
}

export function* bookingsWatcherSaga() {
    yield takeLatest('GET_BOOKINGS', fetchBookingsFlow);
}