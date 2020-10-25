import { connect } from "react-redux";

import { fetchUserProfileSuccess } from "../actions/userActions";
import UserProfile from "../components/UserProfile";

export default connect(
  (state) => ({
    userProfile: state.userState.userProfile,
  }),
  (dispatch) => ({
    fetchUserProfileSuccess: (data) => dispatch(fetchUserProfileSuccess(data)),
  })
)(UserProfile);

