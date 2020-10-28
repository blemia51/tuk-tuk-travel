import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from  'react-redux';
import axios from 'axios';
import TextInput from 'components/input/TextInput'
import SelectInput from 'components/input/SelectInput'
import { validateEmail, validatePhone } from '../utils/validatorUtils'
import CountryList from './CountryList';
import back from '../img/arrowb.png'
import logoOk from '../img/logoOk.png';
import '../App.css'


class FormUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profil: {},
      profilStepOne: {
        lastname: '',
        firstname: '',
        sex: '',
        password: '',
        comfirm_password: '',
        birthday: '',
      },
      profilStepTwo: {
        country: '',
        city: '',
        email: '',
        phone_number: '',
        description: '',
        avatar: '',
      },
      errors: {
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
      },
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

  handleChange = (value, type) => {
    const { profilStepOne, profilStepTwo, profil, errors } = this.state
    if (type === 'email' && value !== '' && !validateEmail(value)) {
      this.setState({
        errors: {
          ...errors,
          [type] : 'Veillez insérer un email valide'
        }
      });
      return;
    }
    if (type === 'phone_number' && value !== '' && !validatePhone(value)) {
      this.setState({
        errors: {
          ...errors,
          [type] : 'Veillez insérer un numéro de téléphone valide'
        }
      });
      return;
    }
    this.setState({
      profil: {
        ...profilStepOne,
        ...profilStepTwo,
        ...profil,
        [type]: value,
      },
      errors: {
        ...errors,
        [type] : '',
      },
    })
  }

  renderInputsStepOne = () => {
    const { profilStepOne: stateProfilStepOne, errors } = this.state;
    const inputsStepOne = Object.keys(stateProfilStepOne).reduce((acc, input) => {
      acc.push(input);
      return acc;
    }, []);

    return inputsStepOne.map((input) => {
      if (input === 'sex') {
        const genres = [
          { value: '', label: '-'},
          { value: 'F', label: 'Féminin'},
          { value: 'M', label: 'Masculin'},
        ];
        return (
          <SelectInput
            key={`input_${input}`}
            id={input}
            className='select--material'
            placeholder=''
            label='Genre'
            onChange={(value) => this.handleChange(value, input)}
            options={genres}
            // errorMessage={errors[input]}
            // hasError={errors[input] !== ''}
            // defaultValue={stateProfil[input] || ''}
          />
        )
      }
      return (
        <TextInput
          type={input}
          label={input}
          //placeholder={input}
          className='select--material'
          name={input}
          isLight
          //={stateProfil[input] || ''}
          onChange={(value) => this.handleChange(value, input)}
          errorMessage={errors[input]}
          hasError={errors[input] !== ''}
        />
      )
    })
  }

  renderInputsStepTwo = () => {
    const { profilStepTwo: stateProfilStepTwo, errors } = this.state;
    const inputsStepTwo = Object.keys(stateProfilStepTwo).reduce((acc, input) => {
      if (input !== 'avatar') {
        acc.push(input);
      }
      return acc;
    }, []);
    return inputsStepTwo.map((input) => {
      return (
        <TextInput
          type={input}
          label={input}
          //placeholder={input}
          className='select--material'
          name={input}
          isLight
          //={stateProfil[input] || ''}
          onChange={(value) => this.handleChange(value, input)}
          errorMessage={errors[input]}
          hasError={errors[input] !== ''}
        />
    )});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {...user} = this.state.profil
    user.avatar = this.props.avatar
    console.log(user)
    axios.post('http://localhost:8000/api/users', user)
    .then(res => {
      this.setState({
        isAdded: true,
      })
      setTimeout(() => {this.props.history.push("/userconnexion")}, 2000)
      
    }).catch(event => {
      console.error(event);
      
    })
  }

  render() {
    return (
      <div className='form-users'>
        {this.state.firstSection ?
          <div>
            <div className="title-form-user">INFOS PERSONNELLES</div>
            <div className='form-header'>
              <Link className='link-back-arrow' to="/Home">
                <figure className='fig-back-arrow'>
                  <img className='back-arrow' src={back} alt='Arrow to back'/>
                </figure>
              </Link>
              <div className="page-form-user">1/2</div>
            </div>
            <span className='form-separator mb-2 mt-2' />
            <div className="profil--general-container">
              <div className="profil--container">
                {this.renderInputsStepOne()}
                <div >
                  <button className='nextButton' onClick = {this.nextPage}>Suivant</button>
                </div>
              </div>
            </div>
          </div>
          :
          <div style={{display:'flex', flexDirection:'column'}}>
            <div className="title-form-user">INFOS PERSONNELLES</div>

            <div>
              <figure className='fig-back-arrow link-back-arrow'>
                <img className='back-arrow' src={back} alt='Arrow to back' onClick = {this.previousPage}/>
              </figure>
              <div className="sec-page-form-user">2/2</div>
            </div>
            <span className='form-separator mb-2 mt-2' />
            <div className="profil--general-container">
              <div className='profil--container'>
                {this.renderInputsStepTwo()}
              {/* <label htmlFor="countrys">Pays</label>
              <CountryList country={this.state.country} change={this.change} />
              */}
              </div>
            </div>
            <div className='form-footer'>
              <Link className='cgu' to="/cgu">Conditions générales d'utilisation</Link>
              <button className='send-form-users' onClick={this.handleSubmit}>Envoyer</button>
            </div>
            {this.state.isAdded ?
              <div className='okUser'>
                <div className='logo-ok'>
                  <img src={logoOk} alt='logo Ok'/>
                </div>
                <p className="user-added">Utilisateur ajouté</p>
              </div> : null}
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    avatar: state.avatarState.avatar,
  }
};

export default connect(mapStateToProps)(FormUsers);
