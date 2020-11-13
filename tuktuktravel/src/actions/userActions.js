export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

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




