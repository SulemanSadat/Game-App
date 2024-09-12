import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from 'lodash';


class GameGenres extends Component {
  state = {};

  render() {
    const { games,images } = this.props;
  
    return (
      <div className="games-genre">
        <h1>Genres</h1>
        <ul style={{listStyleType:'none'}}>
        {games.map((game, index) => (
        <li className="genre-list" key={index}>
        <img className="icon" key={index} src={images[index]} alt={`Image ${index + 1}`} /> 
         <p>{game.title}</p>
        </li>
        ))}        
        </ul>
      </div>
    );
  }
}

export default GameGenres;
