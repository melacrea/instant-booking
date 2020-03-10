import { put, takeLatest, call } from 'redux-saga/effects';
import { axiosInstantBooking } from '../../utils/api';

export const fetchRoomInfos = () => {
    return axiosInstantBooking.get('/login')
        .then(response => response)
}

function* fetchRoomInfosFlow(action) {
    try {
      const response = yield call(fetchRoomInfos, action.payload);
      if (response) {
        localStorage.setItem('jwt_token', response.data.data.token)
        yield put({
          type: 'TOKEN_RECEIVED',
          payload: response.data.success
        });
      }
    } catch (err) {
    }
}

export function* loginWatcherSaga() {
    yield takeLatest('GET_TOKEN', fetchRoomInfosFlow);
}
