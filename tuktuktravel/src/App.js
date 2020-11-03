import React, {useEffect, useRef} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import requireAuth from './hoc/requireAuth';
import requireNotAuth from './hoc/requireNotAuth';
import HomeIntroFirst from './components/HomeIntroFirst';
import HomeIntroSec from './components/HomeIntroSec';
import Home from './components/Home';
import HomeConnected from './container/HomeConnectedContainer';
import FormUsers from './components/FormUsers';
import UserProfile from './container/UserProfileContainer';
import Login from './container/LoginContainer';
import TravelForm from './container/TravelFormContainer';
import TravelCard from './container/TravelCardContainer';
import TravelDetail from './container/TravelDetailContainer';
import MyTravels from './container/MyTravelsContainer';
import MyTravelDetail from './container/MyTravelDetailContainer';
import Cgu from './components/Cgu';
//import { connect } from 'react-redux';


// function mapDispatchToProps(dispatch) {
//   return {
//     resetToken: () => dispatch({
//       type : "DESTROY_SESSION"
//     }),
//     resetAvatar: () => dispatch({
//       type : "DESTROY_AVATAR"
//     }),
//     resetCitypic: () => dispatch({
//       type : "DESTROY_CITYPIC"
//     })
    
//   }
// }

function App(props) {
  const appRef = useRef(null)
  useEffect(() => {
    appRef.current.scrollTop = 0
  })
  return (
    <div ref={appRef} className="App">
      <Switch>
        <Route exact path="/" component={HomeIntroFirst}/>
        <Route exact path="/logout" render={() => {
          props.resetToken()
          props.resetAvatar()
          props.resetCitypic()
          return <Redirect to="/home" />
        }}/>
        <Route exact path="/introsecond" component={HomeIntroSec}/>
        <Route exact path="/home" component={Home}/>
        <Route path="/formusers"component={FormUsers}/>
        {/* <Route path="/profile"component={requireAuth(UserProfileContainer)}/> */}
        <Route path="/profile"component={UserProfile}/>
        <Route path="/cgu"component={Cgu}/>
        <Route path="/userconnexion" component={requireNotAuth(Login)}/>
        <Route path="/Accueil" component={requireAuth(HomeConnected)} />
        <Route exact path="/travelcards" component={requireAuth(TravelCard)}/>
        <Route exact path="/travelform" component={TravelForm}/>
        <Route exact path="/traveldetails" render={(props) => <TravelDetail {...props}/>} />
        <Route exact path="/mytravels" component={MyTravels}/>
        <Route exact path="/mytraveldetails" component={MyTravelDetail} />
      </Switch> 
    </div>
  );
}

export default App;
