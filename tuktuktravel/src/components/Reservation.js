import React, { Component } from "react";
import axios from "axios";
import Button from './fragments/Button'
import logoOk from "../img/logoOk.png";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBooked: false,
    };
    this.onReservation = this.onReservation.bind(this);
  }

  onReservation(e) {
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

  render() {
    const { IDuser_creator, userID } = this.props;
    return (
      <div className="reserve-button">
        <Button onClick={this.onReservation}
          label='Réserver'
          isDisabled={IDuser_creator === userID}
        />
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

export default Reservation;
