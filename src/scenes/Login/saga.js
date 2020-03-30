import { put, takeLatest, call } from 'redux-saga/effects';

import { axiosInstantBooking, handleError } from '../../utils/api';

export const getToken = () => {
  return axiosInstantBooking.get('/login')
    .then(response => response);
};

function* getTokenFlow(action) {
  try {
    const response = yield call(getToken, action.payload);
    if (response) {
      localStorage.setItem('jwt_token', response.data.data.token);
      yield put({
        type: 'TOKEN_RECEIVED',
        payload: response.data.success
      });
    }
  } catch (err) {
    handleError(err);
  }
}

export function* loginWatcherSaga() {
  yield takeLatest('GET_TOKEN', getTokenFlow);
}
