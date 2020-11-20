import { connect } from "react-redux";

import { fetchUserProfile } from "../actions/userActions";
import { fetchTravels } from "../actions/travelCardsActions"
import { fetchMyTravels } from "../actions/myTravelsAction"
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
    fetchUserProfile: (userID, token) => dispatch(fetchUserProfile(userID, token)),
    fetchTravels: () => dispatch(fetchTravels()),
    fetchMyTravels: (userID) => dispatch(fetchMyTravels(userID)),
  })
)(HomeConnected);
