import React, { Component } from "react"
import { connect } from  'react-redux';
import axios from 'axios'
import UploadCityPic from "./UploadCityPic"
import NavFooter from "./NavFooter"
import '../App.css'


class TravelForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      IDuser_creator: '',
      destination : '',
      start_date : '',
      end_date : '',
      number_of_travelers_max : '',
      description : '',
      cityPic: '',
      //isAdded: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit() {

    const {...destination} = this.state
    destination.cityPic = this.props.cityPic
    destination.IDuser_creator = this.props.userID
    //delete destination.isAdded
    
    axios.post('http://localhost:8000/api/travels/',destination)
    .then(res => {
      this.props.history.push('/travelcards')
    }).catch(event => {
      console.error(event)
    });
  }

  render() {
    console.log(this.state)
    return(
      <div className='travel-form'>
        <div className='title-travel-form'>PROPOSE UN TUK-TUK</div>
        <div className = 'add-travel'>
          <label htmlFor='destination'>Destination: </label>
            <input className = 'input-add-travel' id='destination' type='text' name='destination' placeholder='Votre destination..'
            value={this.state.destination} onChange={this.handleInputChange}
            maxLength="20" size="20"/>
          
          <label htmlFor='start_date'>Date de départ: </label>
            <input className = 'input-add-travel' id='start_date' type='date' name='start_date' 
            value={this.state.start_date} onChange={this.handleInputChange}
            ></input>
          
          <label htmlFor='end_date'>Date de retour: </label>
            <input className = 'input-add-travel' type='date' id='end_date' name='end_date' 
            date={this.state.current} value={this.state.end_date} onChange={this.handleInputChange}/>
            
            <label htmlFor='number_of_travelers_max'>Nombre de voyageurs: </label>
            <input className = 'input-add-travel' id='number_of_travelers_max' type='text' name='number_of_travelers_max' placeholder='Voyageurs'
            value={this.state.number_of_travelers_max} onChange={this.handleInputChange}
            maxLength="6" size="6"/>

          <label htmlFor='description'>Description: </label>
            <textarea  className = 'input-add-travel' name ='description' placeholder = 'Projets, activités durant le voyage..'
            rows="5" cols="33" value={this.state.description} onChange={this.handleInputChange}></textarea>
                
        <UploadCityPic onUpload={this.handleSubmit} />
        <NavFooter/>
      </div>
    </div>     
    )
  }
}

function  mapStateToProps(state) {
  return {
      cityPic:  state.cityPic.cityPic,
      userID: state.auth.userID
  }
};

export  default  connect(mapStateToProps)(TravelForm)
