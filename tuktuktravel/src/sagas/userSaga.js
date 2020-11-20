import { takeLatest, put, call } from 'redux-saga/effects';
//import request from '../utils/request';
import UserApi from '../api/UserApi';

import { 
  FETCH_USER_PROFILE,
  fetchUserProfileSuccess,
  userProfileFailure,
  POST_USER_PROFILE,
  postUserProfileSuccess,
  UPDATE_USER_PROFILE,
  updateUserProfileSuccess,
  
 } from "../actions/userActions";


export function* getUserProfile(action) {
  const { userID, token} = action.payload;
  const userApi = new UserApi();
  try {      
    const userProfile = yield call(userApi.fetchUserProfile, userID, token);
    yield put(fetchUserProfileSuccess(...userProfile));
  } catch (e) {
    if (e.response) {
      yield put(userProfileFailure(e.response.data.code));
    } else {
      yield put(userProfileFailure(e.message));
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
    yield put(userProfileFailure(e.message));
  }
}

export function* updateUserProfile(action) {
  try {
    const { userProfile } = action.payload;
    const userApi = new UserApi();
    const userProfileUpdated = yield call(userApi.updateUserProfile, userProfile);
    yield put(updateUserProfileSuccess(userProfileUpdated));
  } catch (e) {
    yield put(userProfileFailure(e.message));
  }
}

export default function* userSaga() {
  console.log('test de userSaga')
  yield takeLatest(FETCH_USER_PROFILE, getUserProfile);
  yield takeLatest(POST_USER_PROFILE, postUserProfile);
  yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);
}
