import React, {useEffect, useRef} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import requireAuth from './hoc/requireAuth'
import requireNotAuth from './hoc/requireNotAuth'
import HomeIntroFirst from './components/HomeIntroFirst';
import HomeIntroSec from './components/HomeIntroSec';
import Home from './components/Home';
import FormUsers from './components/FormUsers'
//import UserProfile from './components/UserProfile'
import UserProfileContainer from './container/UserProfileContainer'
//import Login from './components/Login';
import LoginContainer from './container/LoginContainer'
import TravelForm from './components/TravelForm'
import TravelCards from './components/TravelCards'
import TravelDetails from './components/TravelDetails'
import MyTravels from './components/MyTravels'
import MyTravelDetails from './components/MyTravelDetails'
import Cgu from './components/Cgu'
import './App.css'
import { connect } from 'react-redux';


function mapDispatchToProps(dispatch) {
  return {
    resetToken: () => dispatch({
      type : "DESTROY_SESSION"
    }),
    resetAvatar: () => dispatch({
      type : "DESTROY_AVATAR"
    }),
    resetCitypic: () => dispatch({
      type : "DESTROY_CITYPIC"
    })
    
  }
}

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
        <Route exact path="/travelcards" component={requireAuth(TravelCards)}/>
        <Route exact path="/travelform" component={TravelForm}/>
        <Route exact path="/traveldetails" render={(props) => <TravelDetails {...props}/>} />
        <Route exact path="/mytravels" component={MyTravels}/>
        <Route exact path="/mytraveldetails" component={MyTravelDetails} />
      </Switch> 
    </div>
  );
}


export default connect(null, mapDispatchToProps)(App)
