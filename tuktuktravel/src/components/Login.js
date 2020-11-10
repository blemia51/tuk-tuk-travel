import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextInput from "components/input/TextInput";
import { validateEmail } from "utils/validatorUtils";
import back from "../assets/img/arrowb.png";
import logoFaux from "../assets/img/logoFaux.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        email: "",
        password: "",
      },
      flash: "",
      isNotAdded: false,
      error: "",
    };
  }

  handleChange = (value, type) => {
    const { login } = this.state;
    if (type === 'email' && value !== '' && !validateEmail(value)) {
      this.setState({
        error: 'Veuillez insérer un email valide'
      });
     return;
    }
    this.setState({
      login: {
        ...login,
        [type]: value,
      },
      error: '',
    })
  }

  submitForm = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(this.state.login),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          this.props.history.push("/userconnexion");
          this.setState({
          isNotAdded: true,
          });
        }
      })
      .then((res) => {
        this.props.saveToken(res.token, res.user.userID)
        this.props.history.push("/accueil");
        //this.setState({ flash: res.flash });
      })
      .catch((err) => this.setState({ flash: err.flash }));
  }

  render() {
    const { error } = this.state;
    const { login: stateLogin } = this.state;
    const inputs = Object.keys(stateLogin).reduce((acc, input) => {
      acc.push(input);
      return acc;
    }, []);
    return (
      <div className="travel-cards">
        <div className="title-and-home">
          <div className="title-travel-cards">Connecte - toi ! </div>
          <div>
            <Link className="link-back-arrow" to="/Home">
              <figure className="fig-back-arrow-travelcards">
                <img className="back-arrow" src={back} alt="Arrow to back" />
              </figure>
            </Link>
          </div>
        </div>
        
        <form className="user_connexion" onSubmit={this.submitForm}>
          <div>
            <div className='profil--general-container'>
              <div className="profil--container">
              {inputs.map((input) => {
                return (
                  <TextInput
                    key={`input_${input}`}
                    type={input}
                    label={input}
                    placeholder={input}
                    className='select--material'
                    name={input}
                    onChange={(value) => this.handleChange(value, input)}
                    hasError={input === 'email' && error !== ''}
                    errorMessage={error}
                  />
                )
              })}
            </div>
            </div>
          </div>
          <div className="submit-button">
            <input type="submit" value="Connexion" />
          </div>
        </form>
        
        {this.state.isNotAdded ? (
          <div className="noConnexion">
            <img src={logoFaux} alt="logo Faux" className="error" />
            <p className="erreurConnexion">Erreur de connexion</p>
          </div>
        ) : null}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  saveToken: PropTypes.func
}

export default Login;
