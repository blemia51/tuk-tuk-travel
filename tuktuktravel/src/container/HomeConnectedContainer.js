import { connect } from "react-redux";

import { fetchUserProfile, fetchUserProfileSuccess } from "../actions/userActions";
import { fetchTravels, fetchTravelsSuccess } from "../actions/travelCardsActions"
import { fetchMyTravels, fetchMyTravelsSuccess } from "../actions/myTravelsAction"
import HomeConnected from "../components/HomeConnected";

export default connect(
  (state) => ({
    userProfile: state.userState.userProfile,
    userID: state.auth.userID,
    token: state.auth.token,
    travels: state.travelsState.travels,
    myTravels: state.myTravelsState.myTravels,
  }),
  (dispatch) => ({
    fetchUserProfile: (userID) => dispatch(fetchUserProfile(userID)),
    fetchUserProfileSuccess: (data) => dispatch(fetchUserProfileSuccess(data)),
    fetchTravels: () => dispatch(fetchTravels()),
    fetchMyTravels: (userID) => dispatch(fetchMyTravels(userID)),
    fetchMyTravelsSuccess: (travels) => dispatch(fetchMyTravelsSuccess(travels)),
  })
)(HomeConnected);
