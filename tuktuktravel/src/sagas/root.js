import { spawn, all } from "redux-saga/effects";
import userSaga from "./userSaga";
import { helloSaga } from "sagas/sagas";
import travelsSaga from "sagas/travelsSaga";
import myTravelsSaga from "sagas/myTravelsSaga";


export default function* rootSaga() {
  yield all([
    spawn(userSaga),
    spawn(helloSaga),
    spawn(travelsSaga),
    spawn(myTravelsSaga),
  ]);
}

