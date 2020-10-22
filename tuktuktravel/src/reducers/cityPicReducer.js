export  default  function (state  = {}, action) {
  switch (action.type) {
    case "SEND_CITY_PIC":
      return { ...state, cityPic: action.cityPic};
      case  "DESTROY_CITYPIC":
        let newState = {...state}
        delete newState.cityPic
        return newState
    default:
      return  state;
  }}