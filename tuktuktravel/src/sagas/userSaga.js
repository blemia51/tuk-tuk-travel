import { takeLatest, put, call } from 'redux-saga/effects';
//import request from '../utils/request';
import UserApi from '../api/UserApi';

import { 
  FETCH_USER_PROFILE,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  POST_USER_PROFILE,
  postUserProfileSuccess,
  postUserProfileFailure,
 } from "../actions/userActions";


export function* getUserProfile(action) {
  const { userID } = action.payload;
  const userApi = new UserApi();
  try {      
    const userProfile = yield call(userApi.fetchUserProfile, userID);
    yield put(fetchUserProfileSuccess(...userProfile));
  } catch (e) {
    if (e.response) {
      yield put(fetchUserProfileFailure(e.response.data.code));
    } else {
      yield put(fetchUserProfileFailure(e.message));
    }
  }
}

export function* postUserProfile(action) {
  const { userProfile } = action.payload;
  //const url = '';
  const userApi = new UserApi();
  try {
    const userProfileFetched = yield call(userApi.postUserProfile, userProfile);
    yield put(postUserProfileSuccess(userProfileFetched));
  } catch (e) {
    yield put(postUserProfileFailure(e.message));
  }
}

export default function* userSaga() {
  console.log('test de userSaga')
  yield takeLatest(FETCH_USER_PROFILE, getUserProfile);
  yield takeLatest(POST_USER_PROFILE, postUserProfile);
}
