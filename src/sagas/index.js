import { put, takeLatest, all } from 'redux-saga/effects';
const url =  process.env.REACT_APP_API_ENDPOINT

function* fetchRoomInfos() {
  const json = yield fetch(`${url}/login`)
        .then(response => response.json());

  if(json.success)
    localStorage.setItem('jwt_token', json.data.token)
  
  yield put({ type: "TOKEN_RECEIVED", payload: json.success});
}
function* actionWatcher() {
     yield takeLatest('GET_TOKEN', fetchRoomInfos)
}
export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}