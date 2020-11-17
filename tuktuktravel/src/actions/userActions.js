export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';
export const POST_USER_PROFILE = 'POST_USER_PROFILE';
export const POST_USER_PROFILE_SUCCESS = 'POST_USER_PROFILE_SUCCESS';
export const POST_USER_PROFILE_FAILURE = 'POST_USER_PROFILE_FAILURE';

export const fetchUserProfile = (userID) => ({
  type: FETCH_USER_PROFILE,
  payload: {
    userID: userID,
  },
});

export const fetchUserProfileSuccess = (userState) => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  payload: {
    userProfile: userState,
  },
});

export const fetchUserProfileFailure = (error) => ({
  type: FETCH_USER_PROFILE_FAILURE,
  payload: {
    error,
  },
});

export const postUserProfile = (userProfile) => ({
  type: POST_USER_PROFILE,
  payload: {
    userProfile,
  },
});

export const postUserProfileSuccess = (response) => ({
  type: POST_USER_PROFILE_SUCCESS,
  payload: {
    response,
  },
});

export const postUserProfileFailure = (error) => ({
  type: POST_USER_PROFILE_FAILURE,
  payload: {
    error,
  },
});



