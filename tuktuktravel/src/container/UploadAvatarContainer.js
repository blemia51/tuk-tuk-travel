import { connect } from "react-redux";

import { uploadAvatar, deleteAvatar } from "../actions/avatarActions";
import UploadAvatar from "../components/UploadAvatar";

export default connect(
    (state) => ({
      avatar: state.avatarState.avatar,
    }),
    (dispatch) => ({
      uploadAvatar: (avatar) => dispatch(uploadAvatar(avatar)),
      deleteAvatar: () => dispatch(deleteAvatar()),
    })
  )(UploadAvatar);
