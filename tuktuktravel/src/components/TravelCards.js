import React, { Component } from "react"
import Moment from 'react-moment';
import '../App.css'
import NavFooter from "./NavFooter";
import SearchField from './SearchField'
import { connect } from  'react-redux';
import { Link } from 'react-router-dom';
import back from '../img/arrowb.png'

class TravelCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      travelsTemp: [],
      travelsStore: [],
      input: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/travels',
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
        travelsTemp: data,
        travelsStore: data
    })
  })
  .catch()
  }

  searchField = (event)=>{
    this.setState({input: event.target.value})
    // console.log(event.target.value)
  }

  getCountrys = () => { 
    if (this.state.input.length > 0) {
      const result = this.state.travelsStore.filter(travel => 
        travel.destination.toLowerCase() === this.state.input.toLowerCase())
      this.setState({travelsTemp: result})
    } else {this.setState({travelsTemp: this.state.travelsStore})}
  }


  render() {
    return (
      <div className='travel-cards'>
        <div className='title-and-home'>
        <div className='title-travel-cards'>Tuk-tuk proposés</div>
        <div>
        <Link className='link-back-arrow' to="/logout">
          <figure className='fig-back-arrow-travelcards'>
            <img className='back-arrow' src={back} alt='Arrow to back'/>
          </figure>
        </Link>
        </div>
        </div>
        <SearchField searchField={this.searchField} input={this.state.input} getCountrys={this.getCountrys}/>
        {React.Children.toArray(this.state.travelsTemp.map(travel =>{
          return <div className='liste-travel'>
              
              <figure className='fig-img-travel-cards'>
                <img className='img-travel-cards' alt={travel.cityPic} src={travel.cityPic}></img>
              </figure>
              <Link className="travel-cards-link" to={{
                pathname: "/traveldetails",
                state: {
                  cityPic: travel.cityPic,
                  travelID: travel.travelID,
                  destination: travel.destination,
                  IDuser_creator: travel.IDuser_creator,
                  start_date: travel.start_date,
                  end_date: travel.end_date,
                  description: travel.description
                }
              }}>
              <div>
              <h1 className='travel-cards-title'>{travel.destination}</h1>
              </div>
              </Link>
              <div className='liste-description-travel-cards'>
                <div style ={{display:'flex', justifyContent:'flex-start'}}>
                  <Moment format="DD/MM/YYYY">{travel.start_date}</Moment>
                  <span className='travel-date'>  - </span>
                  <Moment format="DD/MM/YYYY">{travel.end_date}</Moment>
                </div>
              <p>Places: {travel.number_of_travelers_max}</p>
              </div>
              
            
              </div>}))}
              <NavFooter/>
      </div>
    )
  }
}

function  mapStateToProps(state) {
  return {
      token:  state.auth.token,
  }
}
export default connect(mapStateToProps)(TravelCards)
