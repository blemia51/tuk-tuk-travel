export default function (state = {}, action) {
  switch (action.type) {
    case "UPLOAD_AVATAR":
      return {
        ...state,
        avatar: action.payload.avatar,
      };
    case "DELETE_AVATAR":
      let newState = { ...state };
      delete newState.avatar;
      return newState;
    default:
      return state;
  }
}
