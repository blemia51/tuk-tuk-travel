import { connect } from "react-redux";
import { fetchMyTravels, fetchMyTravelsSuccess } from "../actions/myTravelsAction"
import MyTravels from "../components/MyTravels";

export default connect(
  (state) => ({
    userProfile: state.userState.userProfile,
    userID: state.auth.userID,
    token: state.auth.token,
    travels: state.travelsState.travels,
    favorites: state.favoritesState.favorites,
    myTravels: state.myTravelsState.myTravels,
  }),
  (dispatch) => ({
    fetchMyTravels: (userID) => dispatch(fetchMyTravels(userID)),
    fetchMyTravelsSuccess: (travels) => dispatch(fetchMyTravelsSuccess(travels)),
  })
 
)(MyTravels);