import React, { Component } from "react"
import axios from 'axios'
import logoOk from '../img/logoOk.png';



class Reservation extends Component {
constructor(props) {
  super(props) 
  this.onReservation=this.onReservation.bind(this)
  this.state = {
    isBooked: false
  }
}

onReservation(e) {
  e.preventDefault()
      const reservation  = {
        id_user: this.props.userID, 
        id_travel: this.props.travelID
        
      }
      console.log({reservation})
      
      axios.post('http://localhost:8000/api/travel_user',reservation)
      .then(res => {
        //alert('TukTuk reservé');
        this.setState ({
          isBooked: true
        })
      }).catch(event => {
      console.error(event);
      //alert(`Erreur lors de la réservation du TukTuk`);
  });
}

render() {
  return (
    <div className='reserve-button'>
      <button onClick={this.onReservation}>Réserver</button>
      <div className= "tuktuk-booked">{this.state.isBooked?<div style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'5x'}} >
        <img style={{width:'12%'}} src={logoOk} alt='logo Ok'/>tuk-tuk booké</div>:null}
      </div>  
    </div>
   
  )}
}

export default Reservation  