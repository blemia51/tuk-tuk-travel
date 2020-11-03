import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import NavFooter from "./NavFooter";
//import del from "../img/delete.png";
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

  cancelTravelReservation = (id) => {
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

  renderFavorites = () => {
    const { favorites, travels } = this.props;
    const favoris = favorites.map((favorite => travels.find(travel => travel.travelID === favorite)))
    console.log("favoris", favoris)
    return (
      <div>
        <div className="title-travel-cards">Mes Tuk-tuk sauvegardés</div>
        {favoris.length > 0 ? favoris.map(favori => {
          return (
            <div className="tuktuk--favorites">
              <img src={favori.cityPic} className="tuktuk--favorites-image"/>
              <h4>{favori.destination}</h4>
            </div>
          )
        })
      :
      <div className="favorites-placeholder mt-2" >
        <div>
          <i className="fas fa-heart favorites" />
        </div>
        <div className="favorites-placeholder-text">
          <p>Vous n'avez pas sauvegardé d'annonces...</p>
          <p>Cliquez sur l'icone quand un voyage vous fait envie !</p>
        </div>
      </div>
      }
      </div>
    )
  }

  render() {
    // console.log("travel_user", this.state.travel_user)
    // console.log('tadada', this.props.favorites)
    const { favorites, travels } = this.props;
    return (
      <div className="travel-cards">
        <div className="title-travel-cards">Mes Tuk-tuk</div>
        <span className='form-separator mb-2 mt-2' />
        <div className="travel--container">
        <div className="title-travel-cards">Prochains Tuk-tuk Prévus</div>
          {React.Children.toArray(
            this.state.travel_user.map((res) => {
              return (
                <div className="liste-travel">
                  {/* <figure
                    style={{
                      position: "relative",
                      top: "70px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <img
                      style={{ width: "30px", cursor: "pointer" }}
                      onClick={() => this.cancelTravelReservation(res.travel_user_id)}
                      src={del}
                      alt="del"
                    ></img>
                  </figure> */}
                  <div className="fig-img-travel-cards" style={{ backgroundImage: `url(${res.cityPic})` }}>
                    {/* <img
                      className="img-travel-cards"
                      alt={res.cityPic}
                      src={res.cityPic}
                    ></img> */}
                  </div>
                  
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
                        travelUserId: res.travel_user_id,
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
          
        </div>
        {this.renderFavorites()}
        <NavFooter />
      </div>
    );
  }
}

MyTravels.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  token: PropTypes.number,
  userID: PropTypes.number,
}

export default MyTravels;
