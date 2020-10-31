import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import NavFooter from "./NavFooter";
import del from "../img/delete.png";
import axios from "axios";

class MyTravels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travel_user: [],
    };
  }

  componentDidMount() {
    fetch(`http://localhost:8000/api/travel_user/${this.props.userID}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          this.props.history.push("/userconnexion");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        this.setState({
          travel_user: data,
        });
      })
      .catch();
  }

  handleDelete(id) {
    axios
      .delete(`http://localhost:8000/api/travel_user/${id}`)
      .then((res) => {
        const myTravels = this.state.travel_user.filter((travel) => 
          travel.travel_user_id !== id
        );
        this.setState({ travel_user: myTravels });
        //alert(`tuk-tuk supprimé`)
      })
      .catch((event) => {
        console.error(event);
        alert("tuk-tuk non supprimé");
      });
  }

  render() {
    return (
      <div className="travel-cards">
        <div className="title-travel-cards">Mes Tuk-tuk</div>
        {React.Children.toArray(
          this.state.travel_user.map((res) => {
            return (
              <div className="liste-travel">
                <figure
                  style={{
                    position: "relative",
                    top: "70px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    style={{ width: "30px", cursor: "pointer" }}
                    onClick={this.handleDelete.bind(this, res.travel_user_id)}
                    src={del}
                    alt="del"
                  ></img>
                </figure>
                <figure className="fig-img-travel-cards">
                  <img
                    className="img-travel-cards"
                    alt={res.cityPic}
                    src={res.cityPic}
                  ></img>
                </figure>

                <Link
                  className="travel-cards-link"
                  to={{
                    pathname: "/mytraveldetails",
                    state: {
                      cityPic: res.cityPic,
                      travelID: res.travelID,
                      destination: res.destination,
                      IDuser_creator: res.IDuser_creator,
                      start_date: res.start_date,
                      end_date: res.end_date,
                      description: res.description,
                    },
                  }}
                >
                  <h1 className="travel-cards-title">{res.destination}</h1>
                </Link>
                <div className="liste-description-travel-cards">
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <Moment format="DD/MM/YYYY">{res.start_date}</Moment>
                    <span className="travel-date"> - </span>
                    <Moment format="DD/MM/YYYY">{res.end_date}</Moment>
                  </div>
                  <p>Places: {res.number_of_travelers_max}</p>
                </div>
              </div>
            );
          })
        )}
        <NavFooter />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    userID: state.auth.userID,
  };
}

export default connect(mapStateToProps)(MyTravels);
