import PropTypes from "prop-types";
import React, { Component } from "react";
import Moment from "react-moment";
import NavFooter from "./NavFooter";
import SearchInput from "components/input/SearchInput";
import { Link } from "react-router-dom";
import back from "../img/arrowb.png";

class TravelCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelsTemp: [],
      travelsStore: [],
      input: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/travels", {
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
        this.props.fetchTravelsSuccess(data);
        this.setState({
          travelsTemp: data,
          travelsStore: data,
        });
      })
      .catch();

    fetch(`http://localhost:8000/api/users/${this.props.userID}`, {
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
        this.props.fetchUserProfileSuccess(...data);
        this.setState({
          user: data,
        });
      })
      .catch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.input !== this.state.input) {
      this.searchCity();
    }
  }

  searchField = (e) => {
    // this.setState((state) => {
    // // Important : lisez `state` au lieu de `this.state` lors de la mise à jour.
    // return {count: state.count + 1}
    this.setState({ input: e.target.value });
  };

  searchCity = (e) => {
    const { travelsStore, input } = this.state;
    if (input.length > 2) {
      const result = travelsStore.filter((travel) =>
        travel.destination.toLowerCase().includes(input.toLowerCase())
      );
      this.setState({ travelsTemp: result });
    } else {
      this.setState({ travelsTemp: travelsStore });
    }
  };

  render() {
    if (!this.props.userProfile) {
      return null;
    }
    return (
      <div className="travel-cards">
        <div className="title-and-home">
          <div className="title-travel-cards">Tuk-tuk proposés</div>
          <div>
            <Link className="link-back-arrow" to="/logout">
              <figure className="fig-back-arrow-travelcards">
                <img className="back-arrow" src={back} alt="Arrow to back" />
              </figure>
            </Link>
          </div>
        </div>
        <SearchInput
          className='search'
          placeholder={`On part ou ${this.props.userProfile.firstname} ?`}
          onChange={this.searchField}
        />
        <div className="travel--container">
        {React.Children.toArray(
          this.state.travelsTemp.map((travel) => {
            return (
              
              <div className="liste-travel">
                <div className="fig-img-travel-cards" style={{ backgroundImage: `url(${travel.cityPic})` }}>
                  {/* <img
                    className="img-travel-cards"
                    alt={travel.cityPic}
                    src={travel.cityPic}
                  ></img> */}
                </div>
                <Link
                  className="travel-cards-link"
                  to={{
                    pathname: "/traveldetails",
                    state: {
                      travelID: travel.travelID,
                      IDuser_creator: travel.IDuser_creator,
                    },
                  }}
                >
                  <div>
                    <h1 className="travel-cards-title">{travel.destination}</h1>
                  </div>
                </Link>
                <div className="liste-description-travel-cards">
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <Moment format="DD/MM/YYYY">{travel.start_date}</Moment>
                    <span className="travel-date"> - </span>
                    <Moment format="DD/MM/YYYY">{travel.end_date}</Moment>
                  </div>
                  <p>Places: {travel.number_of_travelers_max}</p>
                </div>
              </div>
              
            );
          })
        )}
        </div>

        <NavFooter />
      </div>
    );
  }
}

TravelCards.propTypes = {
  fetchUserProfileSuccess: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  token: PropTypes.string,
  userID: PropTypes.number,
}

export default TravelCards;
