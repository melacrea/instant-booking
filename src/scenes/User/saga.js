import { put, takeLatest, call } from 'redux-saga/effects';

import { axiosInstantBooking, handleError } from '../../utils/api';

export const getCurrentUser = () => {
  const bearer = `Bearer ${localStorage.getItem('jwt_token')}`;
  return axiosInstantBooking.get('/me', {headers: { 'Authorization': bearer}})
    .then(response => response);
};

function* getCurrentUserFlow() {
  try {
    const response = yield call(getCurrentUser);
    if (response) {
      yield put({
        type: 'CURRENT_USER',
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

export function* currentUserWatcherSaga() {
  yield takeLatest('GET_CURRENT_USER', getCurrentUserFlow);
  //yield takeLatest('GET_USER', getCurrentUserFlow);
}