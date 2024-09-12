import React from 'react';

const GameDetails = ({ game, onClose }) => {
  if (!game) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{game.title}</h2>
        <p>Genre: {game.genre.name}</p>
        <p>Version: {game.version}</p>
        <p>Platform: {game.os}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default GameDetails;
