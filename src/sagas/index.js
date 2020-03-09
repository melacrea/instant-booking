import { put, takeLatest, all } from 'redux-saga/effects';
const url =  process.env.REACT_APP_API_ENDPOINT

function* fetchRoomInfos() {
  const json = yield fetch(`${url}/login`)
        .then(response => response.json());

  if(json.success)
    localStorage.setItem('jwt_token', json.data.token)
  
  yield put({ type: "TOKEN_RECEIVED", payload: json.success});
}

function* fetchBookings() {
    const bearer = 'Bearer ' + localStorage.getItem('jwt_token');
    const json = yield fetch(`${url}/bookings`, {
        headers: {
            'Authorization': bearer
        }
    })
          .then(response => response.json());
  
    if(json.success){
        yield put({ type: "BOOKINGS", payload: json.data});
    }else{
        yield put({ type: "TOKEN_RECEIVED", payload: false});
    }

  }

function* actionWatcher() {
     yield takeLatest('GET_TOKEN', fetchRoomInfos)
     yield takeLatest('GET_BOOKINGS', fetchBookings)
}

export default function* rootSaga() {
   yield all([
   actionWatcher()
   ]);
}