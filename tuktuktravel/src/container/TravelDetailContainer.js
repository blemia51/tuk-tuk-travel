import { connect } from "react-redux";

import { uploadFavorite, deleteFavorite } from "../actions/favoriteActions";
import TravelDetails from "../components/TravelDetails";

export default connect(
  (state) => ({
    userProfile: state.userState.userProfile,
    userID: state.auth.userID,
    token: state.auth.token,
    travels: state.travelsState.travels,
    favorites: state.favoritesState.favorites,
  }),
  (dispatch) => ({
    uploadFavorite: (data) => dispatch(uploadFavorite(data)),
    deleteFavorite: () => dispatch(deleteFavorite()),
  })
)(TravelDetails); 
