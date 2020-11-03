import React, {useEffect, useRef} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import requireAuth from './hoc/requireAuth';
import requireNotAuth from './hoc/requireNotAuth';
import HomeIntroFirst from './components/HomeIntroFirst';
import HomeIntroSec from './components/HomeIntroSec';
import Home from './components/Home';
import HomeConnectedContainer from './container/HomeConnectedContainer';
import FormUsers from './components/FormUsers';
//import UserProfile from './components/UserProfile'
import UserProfileContainer from './container/UserProfileContainer';
//import Login from './components/Login';
import LoginContainer from './container/LoginContainer';
//import TravelForm from './components/TravelForm'
import TravelFormContainer from './container/TravelFormContainer';
//import TravelCards from './components/TravelCards'
import TravelCardContainer from './container/TravelCardContainer';

//import TravelDetails from './components/TravelDetails'
import TravelDetailContainer from './container/TravelDetailContainer';
//import MyTravels from './components/MyTravels'
import MyTravelsContainer from './container/MyTravelsContainer';
//import MyTravelDetails from './components/MyTravelDetails'
import MyTravelDetailContainer from './container/MyTravelDetailContainer';
import Cgu from './components/Cgu';
//import './App.css'
import { connect } from 'react-redux';


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
        <Route path="/profile"component={UserProfileContainer}/>

        <Route path="/cgu"component={Cgu}/>
        <Route path="/userconnexion" component={requireNotAuth(LoginContainer)}/>

        <Route path="/Accueil" component={HomeConnectedContainer} />

        <Route exact path="/travelcards" component={requireAuth(TravelCardContainer)}/>
        <Route exact path="/travelform" component={TravelFormContainer}/>
        <Route exact path="/traveldetails" render={(props) => <TravelDetailContainer {...props}/>} />
        <Route exact path="/mytravels" component={MyTravelsContainer}/>
        <Route exact path="/mytraveldetails" component={MyTravelDetailContainer} />
      </Switch> 
    </div>
  );
}


// export default connect(null, mapDispatchToProps)(App)
export default App

