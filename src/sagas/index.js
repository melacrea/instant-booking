import { all } from 'redux-saga/effects';

import { loginWatcherSaga } from '../scenes/Login/saga';
import { bookingsWatcherSaga } from '../scenes/Bookings/saga';
import { resourcesWatcherSaga } from '../scenes/Resource/saga';
import { currentUserWatcherSaga } from '../scenes/User/saga';
import { usersWatcherSaga } from '../scenes/Users/saga';

export default function* rootSaga() {
  yield all([
    loginWatcherSaga(),
    bookingsWatcherSaga(),
    resourcesWatcherSaga(),
    currentUserWatcherSaga(),
    usersWatcherSaga()
  ]);
}