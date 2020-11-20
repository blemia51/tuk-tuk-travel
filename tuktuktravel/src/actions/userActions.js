export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const USER_PROFILE_FAILURE = 'USER_PROFILE_FAILURE';
export const POST_USER_PROFILE = 'POST_USER_PROFILE';
export const POST_USER_PROFILE_SUCCESS = 'POST_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';


export const fetchUserProfile = (userID, token) => ({
  type: FETCH_USER_PROFILE,
  payload: {
    userID: userID,
    token,
  },
});

export const fetchUserProfileSuccess = (userState) => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  payload: {
    userProfile: userState,
  },
});

export const userProfileFailure = (error) => ({
  type: USER_PROFILE_FAILURE,
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

export const updateUserProfile = (userProfile) => ({
  type: UPDATE_USER_PROFILE,
  payload: {
    userProfile,
  },
});

export const updateUserProfileSuccess = (response) => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload: {
    response,
  },
});
