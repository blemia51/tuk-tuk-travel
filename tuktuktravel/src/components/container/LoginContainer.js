import UserConnexion from '../UserConnexion'
import { connect } from  'react-redux';


function  mapStateToProps(state) {
  return {
      token:  state.auth.token,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveToken: () => dispatch({
      type : "CREATE_SESSION", 
      user: res.user,
      token : res.token,
      message : res.message
    })
    
  }
}

export  default  connect(mapStateToProps,mapDispatchToProps)(UserConnexion)




