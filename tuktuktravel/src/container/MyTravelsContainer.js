import { connect } from "react-redux";
import MyTravels from "../components/MyTravels";

export default connect(
  (state) => ({
    userProfile: state.userState.userProfile,
    userID: state.auth.userID,
    token: state.auth.token,
    travels: state.travelsState.travels,
  }),
 
)(MyTravels);