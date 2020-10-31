import { connect } from "react-redux";

//import { fetchUserProfileSuccess } from "../actions/userActions";
import TravelDetails from "../components/TravelDetails";

export default connect(
  (state) => ({
    userProfile: state.userState.userProfile,
    userID: state.auth.userID,
    token: state.auth.token,
    travels: state.travelsState.travels,
  }),
  // (dispatch) => ({
  //   fetchUserProfileSuccess: (data) => dispatch(fetchUserProfileSuccess(data)),
  // })
)(TravelDetails);
