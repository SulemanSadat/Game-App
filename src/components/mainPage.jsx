import React, { memo } from 'react';


const MainGames = memo(({ games, images }) => {
  return (
    <div className="menu">
      {games.map((game, index) => (
        <div className="menu-2" key={index}>
          <img className="image" src={images[index]} alt={`Image ${index + 1}`} />
          <p>{game.title}</p>
        </div>
      ))}
    </div>
  );
});

export default MainGames;
