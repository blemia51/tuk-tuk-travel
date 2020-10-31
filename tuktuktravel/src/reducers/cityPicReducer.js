export default function (state = {}, action) {
  switch (action.type) {
    case "UPLOAD_CITY_PIC":
      return {
        ...state,
        cityPic: action.paylod.cityPic,
      };
    case "DELETE_CITY_PIC":
      let newState = { ...state }
      delete newState.cityPic
      return newState
    default:
      return state;
  }
}