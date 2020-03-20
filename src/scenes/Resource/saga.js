import { put, takeLatest, call } from 'redux-saga/effects';

import { axiosInstantBooking, handleError } from '../../utils/api';

export const getResource = () => {
  const bearer = `Bearer ${localStorage.getItem('jwt_token')}`;
  return axiosInstantBooking.get('/resource', {headers: { 'Authorization': bearer}})
    .then(response => response);
};

function* getResourceFlow(action) {
  try {
    const response = yield call(getResource, action.payload);
    if (response) {
      yield put({
        type: 'RESOURCE',
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

export function* resourcesWatcherSaga() {
  yield takeLatest('GET_RESOURCE', getResourceFlow);
}