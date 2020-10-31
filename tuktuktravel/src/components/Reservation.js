import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import Button from './fragments/Button'
import logoOk from "../img/logoOk.png";

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

    axios
      .post("http://localhost:8000/api/travel_user", reservation)
      .then((res) => {
        //alert('TukTuk reservé');
        this.setState({
          isBooked: true,
        });
      })
      .catch((event) => {
        console.error(event);
        //alert(`Erreur lors de la réservation du TukTuk`);
      });
  }

  componentDidUpdate(prevProps) {
    const { isUserBooked, travelersMax } = this.state;
    const { users, userID, numberOfTravelersMax } = this.props;
    
    if (users !== prevProps.users ) {
      const user = users.filter((user) => user.userID === userID)
      user.length > 0 && 
        this.setState({ isUserBooked: !isUserBooked })
      users.length === numberOfTravelersMax &&
        this.setState({travelersMax: !travelersMax}, () => console.log('rororo', travelersMax))
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
        {isUserBooked &&
          <Button label='Annuler ma réservation' />
        }
        <div className="tuktuk-booked">
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
