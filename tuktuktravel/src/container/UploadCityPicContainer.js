import { connect } from "react-redux";

import { uploadCityPic, deleteCityPic } from "../actions/avatarActions";
import UploadCityPic from "../components/UploadCityPic";

export default connect(
    (state) => ({
      cityPic: state.cityPicState,cityPic,
    }),
    (dispatch) => ({
      uploadCityPic: (cityPic) => dispatch(uploadCityPic(cityPic)),
      deleteCityPic: () => dispatch(deleteCityPic()),
    })
  )(UploadCityPic);
