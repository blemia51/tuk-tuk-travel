import { takeLatest, put, call } from 'redux-saga/effects';
import request from '../utils/request'
import { 
  FETCH_MY_TRAVELS,
  fetchMyTravelsSuccess,
  fetchMyTravelsFailure,
} from "../actions/myTravelsAction";
 
  
export function* getMyTravels(action) {
  const { userID } = action.payload;
  const url = `/api/travel_user/${userID}`
  try {      
    const myTravels = yield call(request, url);
    console.log('myTravels', myTravels);
    yield put(fetchMyTravelsSuccess(myTravels));
  } catch (e) {
    if (e.response) {
      yield put(fetchMyTravelsFailure(e.response.data.code));
    } else {
      yield put(fetchMyTravelsFailure(e.message));
    }
  }
}

export default function* myTravelsSaga() {
  console.log('test de myTravelsSaga')
  yield takeLatest(FETCH_MY_TRAVELS, getMyTravels)
}