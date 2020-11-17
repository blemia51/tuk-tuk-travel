import { spawn, all } from "redux-saga/effects";
import userSaga from "./userSaga";
import travelsSaga from "sagas/travelsSaga";
import myTravelsSaga from "sagas/myTravelsSaga";


export default function* rootSaga() {
  yield all([
    spawn(userSaga),
    spawn(travelsSaga),
    spawn(myTravelsSaga),
  ]);
}

