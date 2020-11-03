import { connect } from "react-redux";

import { fetchUserProfileSuccess } from "../actions/userActions";
import { fetchTravelsSuccess } from "../actions/travelCardsActions"
import { fetchMyTravelsSuccess } from "../actions/myTravelsAction"
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
    fetchUserProfileSuccess: (data) => dispatch(fetchUserProfileSuccess(data)),
    fetchTravelsSuccess: (travels) => dispatch(fetchTravelsSuccess(travels)),
    fetchMyTravelsSuccess: (travels) => dispatch(fetchMyTravelsSuccess(travels)),
  })
)(HomeConnected);
