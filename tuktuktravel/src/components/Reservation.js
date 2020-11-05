import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import Button from './fragments/Button'
import logoOk from "../assets/img/logoOk.png";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBooked: false,
      isUserBooked : false,
      travelersMax: false,
    };
  }

  handleReservation = (e) => {
    e.preventDefault();
    const reservation = {
      id_user: this.props.userID,
      id_travel: this.props.travelID,
    };
    const { isUserBooked } = this.state;

    axios
      .post("/api/travel_user", reservation)
      .then((res) => {
        //alert('TukTuk reservé');
        this.setState({
          isBooked: true,
          isUserBooked: !isUserBooked,
        });
      })
      .catch((event) => {
        console.error(event);
        //alert(`Erreur lors de la réservation du TukTuk`);
      });
  }

  cancelReservation = (id) => {
    const { isUserBooked } = this.state;
    axios
      .delete(`/api/travel_user/${id}`)
      .then((res) => {
        // const myTravels = this.state.travel_user.filter((travel) => 
        //   travel.travel_user_id !== id
        // );
        this.setState({ isUserBooked: !isUserBooked });
        //alert(`tuk-tuk supprimé`)
      })
      .catch((event) => {
        console.error(event);
        alert("tuk-tuk non supprimé");
      });
  }

  componentDidUpdate(prevProps) {
    const { isUserBooked, travelersMax } = this.state;
    const { users, userID, numberOfTravelersMax } = this.props;
    
    if (users !== prevProps.users ) {
      const user = users.filter((user) => user.userID === userID)
      user.length > 0 && 
        this.setState({ isUserBooked: !isUserBooked });
      users.length === numberOfTravelersMax &&
        this.setState({travelersMax: !travelersMax});
    }
  }

  render() {
    const { IDuser_creator, userID, users } = this.props;
    const { isUserBooked, travelersMax } = this.state;
    console.log('isUserBooked', isUserBooked)
    console.log('users', users)
    return (
      <div className="reserve-button">
        <Button onClick={this.handleReservation}
          label='Réserver'
          isDisabled={IDuser_creator === userID || isUserBooked || travelersMax}
        />
        {/* {isUserBooked &&
          <Button
            onClick={this.cancelReservation}
            label='Annuler ma réservation'
            isDisabled={!isUserBooked}
          />
        } */}
        <div className="tuktuk-booked" style={{display: 'none'}}>
          {this.state.isBooked ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "5x",
              }}
            >
              <img style={{ width: "12%" }} src={logoOk} alt="logo Ok" />
              tuk-tuk booké
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

Reservation.propTypes = {
  IDuser_creator: PropTypes.number,
  travelID: PropTypes.number,
  userID: PropTypes.number,
  users: PropTypes.array,
}

export default Reservation;
