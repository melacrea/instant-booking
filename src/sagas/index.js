import { all } from 'redux-saga/effects';
import { loginWatcherSaga } from '../scenes/Login/saga';
import { bookingsWatcherSaga } from '../scenes/Bookings/saga';

export default function* rootSaga() {
  yield all([
    loginWatcherSaga(),
    bookingsWatcherSaga()
  ]);
}