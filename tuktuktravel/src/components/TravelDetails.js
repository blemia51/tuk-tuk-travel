import React, { Component } from "react"
import { connect } from  'react-redux'
import { Link } from 'react-router-dom';
import back from '../img/arrowb.png'
import Moment from 'react-moment';
import Reservation from './Reservation'
import NavFooter from './NavFooter'

class TravelDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userCreator: [],
      users: []
    }
  }
  componentDidMount() {
    fetch(`http://localhost:8000/api/users/${this.props.location.state.IDuser_creator}`,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok) {
        this.props.history.push('/userconnexion')
      } 
      else {
        return res.json()
      }
    })
    .then(data => {
      this.setState({
        userCreator: data[0]
      })
    })
    .catch()

  fetch(`http://localhost:8000/api/travels/${this.props.location.state.travelID}/users`,
  {
    method:'GET',
    headers:{
      'Authorization':  'Bearer '  +  this.props.token,
      'Content-Type':  'application/json'
    }
  })
  .then(res => {
    if(!res.ok) {
      this.props.history.push('/userconnexion')
    }
    else {
      return res.json()
    }
  })
  .then(data => {
    this.setState({
      users: data
  })
})
.catch()
  }
  
  render() {
    return (

      <div className='travel-details'>
        <div className='img-travel-details'>
          <figure className='container-city-picture'>
            <img className='city-picture' src={this.props.location.state.cityPic} alt={this.props.location.state.cityPic}/>
          </figure>
          <p className='travel-cards-link travel-cards-title'>{this.props.location.state.destination} </p>
        </div>
        
        <div className='travel-creator'>
          <img src={this.state.userCreator.avatar} alt='Avatar' className='user-creator-avatar' ></img>
          <div className='travel-detail-container'>
            <div className='link-back-arrow-details'>
              <Link to="/travelcards">
                <img className='back-arrow' src={back} alt='Arrow to back'/>
              </Link>
            </div>

            <p className='firstname-traveldetails'>{this.state.userCreator.firstname}</p>
            <p>Contact: {this.state.userCreator.email}</p>
            <div className='dates'>
              <p className='date-traveldetails'><Moment format="DD/MM/YYYY">{this.props.location.state.start_date}</Moment> </p>
              <span className= 'traveldetails-date'> - </span>
              <p className='date-traveldetails'><Moment format="DD/MM/YYYY">{this.props.location.state.end_date}</Moment> </p>
            </div>

            <div className='travel-user-avatar-container'>
              {React.Children.toArray(this.state.users.map(
                user => <div className='travel-user-description'>
                  <div className='travel-user-avatar-box'>
                    <img src={user.avatar} alt='avatar' className='travel-user-avatar'></img>
                  </div>
                  <p className='travel-user-avatar-firstname'>{user.firstname}</p>
                </div>
              ))}
            </div>
            <div className='traveldetail-description'>
              <p className='descr-traveldetails'>{this.props.location.state.description} </p> 
            </div>
          </div>
          <div className='reserve'>
            <Reservation userID={this.props.userID} travelID={this.props.location.state.travelID} />
          </div>
        </div>
        <NavFooter />
      </div>
    )
  }
}

function  mapStateToProps(state) {
  return {
      token:  state.auth.token,
      userID: state.auth.userID
  }
}
export default connect(mapStateToProps)(TravelDetails)
