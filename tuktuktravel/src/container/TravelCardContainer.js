import { connect } from "react-redux";

import { fetchUserProfileSuccess } from "../actions/userActions";
import { fetchTravels, fetchTravelsSuccess } from "../actions/travelCardsActions"
import TravelCards from "../components/TravelCards";

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
    fetchTravels: () => dispatch(fetchTravels()),
    fetchTravelsSuccess: (travels) => dispatch(fetchTravelsSuccess(travels)),
  })
)(TravelCards);
