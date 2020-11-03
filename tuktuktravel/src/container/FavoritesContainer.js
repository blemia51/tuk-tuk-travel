import { connect } from "react-redux";

import { uploadFavorite, deleteFavorite } from "../actions/favoriteActions";
import Favorites from "../components/Favorites";

export default connect(
    (state) => ({
      favorites: state.favoritesState.favorites,
    }),
    (dispatch) => ({
      uploadFavorite: (data) => dispatch(uploadFavorite(data)),
      deleteFavorite: () => dispatch(deleteFavorite()),
    })
  )(Favorites);