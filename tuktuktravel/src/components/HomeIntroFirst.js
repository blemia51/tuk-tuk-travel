import React, { Component } from "react";
import { Link } from 'react-router-dom';
//import imgFirstPage from '../assets/img/imgFirstPage.png';


class HomeIntroFirst extends Component {

  render() {
    return (
      <div className='home-intro'>
        <figure className='figure-img-first-page'
        style={{
          backgroundImage:'url(imgFirstPage.png)',
          height:'180px',
          backgroundRepeat:'no-repeat',
          backgroundPositionX:'center',
          backgroundPositionY:'38px',
          backgroundSize:'cover',
          }}>
            
          {/* <img className='img-first-page' src={imgFirstPage} alt='first page'/> */}
        </figure>
        <div className='title-intro'> 
          EXPLORE LE MONDE
        </div>
        <div className='text-intro'> 
          Le monde est plus ouvert que jamais, autant en profiter !
        </div>
        <div className='intro-link'>
          <Link  to="/introsecond">Suivant</Link>
        </div>
      </div>
    )
  }
}

export default HomeIntroFirst;
