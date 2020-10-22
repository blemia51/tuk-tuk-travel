import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from  'react-redux';
import axios from 'axios';
import CountryList from './CountryList';
import back from '../img/arrowb.png'
import logoOk from '../img/logoOk.png';
import '../App.css'


class FormUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastname: '',
      firstname: '',
      sex: '',
      password: '',
      comfirm_password: '',
      birthday: '',
      country: '',
      city: '',
      email: '',
      phone_number: '',
      description: '',
      avatar: '',
      isAdded: false,
      firstSection: true,
      secondSection: false,
    };
  }

  nextPage = () => {
    this.setState({
      firstSection: false,
      secondSection: true
    })
  } 

  previousPage = () => {
    this.setState({
      firstSection: true,
      secondSection: false
    })
  } 
  
  change = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  submit = e => {
    e.preventDefault();
    const {...user} = this.state
    user.avatar = this.props.avatar
    console.log(user)
    axios.post('http://localhost:8000/api/users',user)
    .then(res =>{
      this.setState({
        isAdded: true
      })
      setTimeout(()=>{this.props.history.push("/userconnexion")},2000)
      
    }).catch(event => {
      console.error(event);
      
    })
  }



  render(){
    return(
      
      <div className='form-users'>
        {this.state.firstSection?
        <div>
          <div className="title-form-user">INFOS PERSONNELLES</div>
          <div className="page-form-user">1/2</div>
          <Link className='link-back-arrow' to="/Home">
            <figure className='fig-back-arrow'>
              <img className='back-arrow' src={back} alt='Arrow to back'/>
            </figure>
          </Link>
          <div className='firstSection'>
            <div className="div-add-user">
              <label htmlFor="lastname">Nom</label>
              <input type="text" id="lastname" onChange={this.change} />
              <label htmlFor="firstname">Prénom</label>
              <input type="text" id="firstname" onChange={this.change} />
              <label htmlFor="sex">Sexe</label>
              <div className='sex-form-user'>
                <select className="sex sex-form-user" id="sex" onChange={this.change} >
                <option value=""></option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
                <option value="autre">Autre</option>
                </select>
              </div>
              <label htmlFor="password">Mot de passe</label>
              <input type="password" id="password" onChange={this.change} />
              <label htmlFor="comfirm-password"> Confirmation mot de passe</label>
              <input type="password" id="comfirm-password" onChange={this.change} />
              <label htmlFor="birthday">Date de naissance</label>
              <div className='input-birthday' >
                <input type="date" id="birthday" onChange={this.change} />
              </div>
              <div >
                <button className='nextButton' onClick = {this.nextPage}>Suivant</button>
              </div>
            </div>
          </div>
        </div>
        :
        <div>
          <figure className='fig-back-arrow link-back-arrow'>
              <img className='back-arrow' src={back} alt='Arrow to back' onClick = {this.previousPage}/>
          </figure>
            
          <div className="sec-page-form-user">2/2</div>

          <div className='secondSection div-add-user'>
            <label htmlFor="countrys">Pays</label>
            <CountryList country={this.state.country} change={this.change} />

            <label htmlFor="city">Ville</label>
            <input type="text" id="city" onChange={this.change} />
            
            <label htmlFor="email">E-mail</label>
            <input type="text" id="email" onChange={this.change} />
            
            <label htmlFor="phone_number">Numéro de téléphone</label>
            <input type="text" id="phone_number" onChange={this.change} />
            
            <label htmlFor="description">Description</label>
            <input type="text" id="description" onChange={this.change} />
            
            <Link className='cgu' to="/cgu">Conditions générales d'utilisation</Link>
            
            <button className='send-form-users' onClick={this.submit}>Envoyer</button>
            {this.state.isAdded ?
              <div className='okUser'>
                <div className='logo-ok'>
                  <img src={logoOk} alt='logo Ok'/>
                </div>
                <p className="user-added">Utilisateur ajouté</p>
              </div> : null}
          </div>  
        </div>}
      </div>
    );
  }
}

function  mapStateToProps(state) {
  return {
      avatar:  state.avatar.avatar,
  }
};
export  default  connect(mapStateToProps)(FormUsers)
