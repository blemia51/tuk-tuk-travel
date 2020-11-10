import React, { Component, Suspense } from "react";
import { Link } from 'react-router-dom';
import imgSecPage from '../assets/img/imgSecPage.png';


class HomeIntroSec extends Component {

  render() {
    return (
      <div className='home-intro'>
        <figure 
          className='figure-img-sec-page' 
          style={{
            backgroundImage:'url(imgSecPage.png)',
            height:'180px',
            backgroundRepeat:'no-repeat',
            backgroundPositionX:'center',
            backgroundPositionY:'38px'
            }}>
          {/* <img className='img-sec-page' src={imgSecPage} alt='second page'/> */}
          
        </figure>
        <div className='title-intro'> 
          TROUVE TON  VOYAGE IDEAL
        </div>
        <div className='text-intro' style={{marginTop: '49px'}}> 
          Dis nous où tu veux aller, comment et les activités réalisées sur place
        </div>
        <div className='intro-link' style={{marginTop:'45px'}}>
          <Link to="/home">Suivant</Link>
        </div>
      </div>
    )
  }
}

export default HomeIntroSec;