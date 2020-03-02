import { put, takeLatest, all } from 'redux-saga/effects';
function* fetchRoomInfos() {
  const json = yield fetch('http://localhost:4000/login')
        .then(response => response.json(), );
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