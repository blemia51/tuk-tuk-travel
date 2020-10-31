import React, { Component } from "react";
import axios from 'axios';
import TextInput from '../components/input/TextInput';
import UploadCityPic from "./UploadCityPic";
import NavFooter from "./NavFooter";
import '../App.css';

class TravelForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      travelForm: {
        IDuser_creator: '',
        destination : '',
        start_date : '',
        end_date : '',
        number_of_travelers_max : '',
        description : '',
        cityPic: '',
    },
      //isAdded: false
    }
  }

  handleChange = (value, type) => {
    const { travelForm } = this.state;
    this.setState({
      travelForm: {
        ...travelForm,
        [type]: value,
      },
    })
  }

  renderInputs = () => {
    const { travelForm: stateTravelForm } = this.state;
    const inputs = Object.keys(stateTravelForm).reduce((acc, input) => {
      if (input !== 'IDuser_creator' && input !== 'cityPic') {
        acc.push(input);
      }
      return acc;
    }, []);

    return inputs.map((input) => {
      let date = ''
      if (input.split('_').join(' ').includes('date')) {
         date = 'JJ/MM/AAAA'
      }

      return (
        <TextInput
          type={input}
          label={input.split('_').join(' ')}
          placeholder={date}
          className='select--material'
          name={input}
          isLight
          onChange={(value) => this.handleChange(value, input)}
          // hasError={input === 'email' && error !== ''}
          // errorMessage={error}
        />
      )
    })
  }

  handleSubmit = () => {
    const {...destination} = this.state.travelForm;
    const { cityPic, userID } = this.props;
    Object.assign(destination, {cityPic: cityPic, IDuser_creator: userID});
    //console.log('destination', destination)
    axios.post('http://localhost:8000/api/travels/', destination)
    .then(res => {
      this.props.history.push('/travelcards')
    }).catch(event => {
      console.error(event)
    });
  }

  render() {
    return (
      <div className='travel-form'>
        <div className='title-travel-form'>PROPOSE UN TUK-TUK</div>
        <span className='form-separator mb-2 mt-2' />
        <div className = 'add-travel'>
          <div className="profil--general-container">
            <div className="profil--container">
              {this.renderInputs()}
            </div>
          </div>    
          <UploadCityPic onUpload={this.handleSubmit} />
          <NavFooter />
        </div>
      </div>     
    )
  }
}

export default TravelForm;
