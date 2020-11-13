import { takeLatest, put, call } from 'redux-saga/effects';
import request from '../utils/request';
import { 
  FETCH_USER_PROFILE,
  fetchUserProfileSuccess,
  fetchUserProfileFailure
 } from "../actions/userActions";


export function* getUserProfile(action) {
  const { userID } = action.payload;
  console.log('userID', userID)
  const url = `/api/users/${userID}`
  try {      
    const userProfile = yield call(request, url);
    console.log('userProfile', userProfile);
    yield put(fetchUserProfileSuccess(...userProfile));
  } catch (e) {
    if (e.response) {
      yield put(fetchUserProfileFailure(e.response.data.code));
    } else {
      yield put(fetchUserProfileFailure(e.message));
    }
  }
}

export default function* userSaga() {
  console.log('test de userSaga')
  yield takeLatest(FETCH_USER_PROFILE, getUserProfile);
}
