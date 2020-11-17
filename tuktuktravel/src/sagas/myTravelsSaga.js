import { takeLatest, put, call } from 'redux-saga/effects';
import TravelsApi from '../api/TravelsApi';
import { 
  FETCH_MY_TRAVELS,
  fetchMyTravelsSuccess,
  fetchMyTravelsFailure,
} from "../actions/myTravelsAction";
 
  
export function* getMyTravels(action) {
  const { userID } = action.payload;
  const travelsApi = new TravelsApi();
  try {      
    const myTravels = yield call(travelsApi.fetchMyTravels, userID);
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
  yield takeLatest(FETCH_MY_TRAVELS, getMyTravels);
}