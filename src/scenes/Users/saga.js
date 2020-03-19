import { put, takeLatest, call } from 'redux-saga/effects';

import { axiosInstantBooking, handleError } from '../../utils/api';

export const getUser = data => {
  const bearer = `Bearer ${localStorage.getItem('jwt_token')}`;
  return axiosInstantBooking.get(`/users/${data.id}`, {headers: { 'Authorization': bearer}})
    .then(response => response);
};

function* getUserFlow(action) {
  console.log('here');
  
  try {
    const response = yield call(getUser, action.payload);
    if (response) {
      yield put({
        type: 'ADD_USER',
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

export function* usersWatcherSaga() {
  yield takeLatest('GET_USER', getUserFlow);
}