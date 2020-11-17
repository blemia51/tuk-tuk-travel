import { connect } from "react-redux";

import { fetchUserProfile, fetchUserProfileSuccess, postUserProfile } from "../actions/userActions";
import UserProfile from "../components/UserProfile";

export default connect(
  (state) => ({
    userProfile: state.userState.userProfile,
    userID: state.auth.userID,
    avatar: state.avatarState.avatar,
  }),
  (dispatch) => ({
    fetchUserProfileSuccess: (data) => dispatch(fetchUserProfileSuccess(data)),
    fetchUserProfile: (userID) => dispatch(fetchUserProfile(userID)),
    postUserProfile: (userProfile) => dispatch(postUserProfile(userProfile)),
  })
)(UserProfile);
