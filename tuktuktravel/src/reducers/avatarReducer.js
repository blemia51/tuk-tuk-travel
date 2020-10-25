export  default  function (state  = {}, action) {
  switch (action.type) {
      case  "SEND_AVATAR":
        return { ...state, avatar: action.avatar};
      case  "DESTROY_AVATAR":
        let newState = {...state}
        delete newState.avatar
        return newState
      default:
        return  state;
  }}