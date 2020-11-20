import { connect } from "react-redux";

import { fetchUserProfile, postUserProfile, updateUserProfile } from "../actions/userActions";
import UserProfile from "../components/UserProfile";

export default connect(
  (state) => ({
    userProfile: state.userState.userProfile,
    userID: state.auth.userID,
    avatar: state.avatarState.avatar,
    token: state.auth.token,
  }),
  (dispatch) => ({
    fetchUserProfile: (userID, token) => dispatch(fetchUserProfile(userID, token)),
    postUserProfile: (userProfile) => dispatch(postUserProfile(userProfile)),
    updateUserProfile: (userProfile) => dispatch(updateUserProfile(userProfile)),
  })
)(UserProfile);
