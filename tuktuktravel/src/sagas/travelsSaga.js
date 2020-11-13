import { takeLatest, put, call } from 'redux-saga/effects';
import request from '../utils/request'
import { 
  FETCH_TRAVELS,
  fetchTravelsSuccess,
  fetchTravelsFailure,
} from "../actions/travelCardsActions";
 
  
export function* getTravels() {
  const url = '/api/travels'
  try {      
    const travels = yield call(request, url);
    console.log('travels', travels);
    yield put(fetchTravelsSuccess(travels));
  } catch (e) {
    if (e.response) {
      yield put(fetchTravelsFailure(e.response.data.code));
    } else {
      yield put(fetchTravelsFailure(e.message));
    }
  }
}

export default function* travelsSaga() {
  console.log('test de travelsSaga')
  yield takeLatest(FETCH_TRAVELS, getTravels)
}