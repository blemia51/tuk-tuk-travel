import { connect } from "react-redux";

import { fetchUserProfile, fetchUserProfileSuccess } from "../actions/userActions";
import UserProfile from "../components/UserProfile";

export default connect(
  (state) => ({
    userProfile: state.userState.userProfile,
    userID: state.auth.userID,
  }),
  (dispatch) => ({
    fetchUserProfileSuccess: (data) => dispatch(fetchUserProfileSuccess(data)),
    fetchUserProfile: (userID) => dispatch(fetchUserProfile(userID))
  })
)(UserProfile);
