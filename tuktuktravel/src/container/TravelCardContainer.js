import { connect } from "react-redux";

import { fetchUserProfileSuccess } from "../actions/userActions";
import TravelCards from "../components/TravelCards";

export default connect(
  (state) => ({
    userProfile: state.userState.userProfile,
    userID: state.auth.userID,
  }),
  (dispatch) => ({
    fetchUserProfileSuccess: (data) => dispatch(fetchUserProfileSuccess(data)),
  })
)(TravelCards);
