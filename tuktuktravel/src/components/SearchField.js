import React from 'react';


const SearchField = (props) =>{
  return(
      <div className = "search-field">
        <input onChange={props.searchField} value={props.input} id='searchField' type = 'text' placeholder = 'Veuillez saisir une destination'></input>
        <button onClick={props.getCountrys} className='add-tuktuk' value = 'search'>Rechercher</button>
      </div>
    );
  }

export default SearchField;
