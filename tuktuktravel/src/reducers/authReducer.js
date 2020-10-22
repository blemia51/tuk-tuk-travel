export  default  function (state  = {}, action) {
  switch (action.type) {
      case  "CREATE_SESSION":
          return { ...state, token: action.token, userID: action.userID}
      case  "DESTROY_SESSION":
          let newState = {...state}
          delete newState.token
          delete newState.userID
          return newState
      default:
          return  state;
  }}