import React from 'react';

function Tile({ id, value, position, onClick }) {
  // If value is null, this is the empty tile
  if (value === null) {
    return (
      <div 
        id={`P${position}of9`} 
        className="tile empty-tile"
        onClick={onClick}
      />
    );
  }

  return (
    <div 
      id={`P${position}of9`} 
      className="tile"
      onClick={onClick}
    >
      <span className="tile-number">{value}</span>
    </div>
  );
}

export default Tile;
