import React from 'react';

function Tile({ id, value, position, visualPosition, imageUrl, onClick }) {
  // Calculate the position for CSS grid
  const getStyle = () => {
    // Calculate grid row and column based on visualPosition for a 2x3 grid
    const row = Math.ceil(visualPosition / 3);
    const col = (visualPosition - 1) % 3 + 1;
    
    const baseStyle = {
      gridRow: row,
      gridColumn: col,
      transition: 'all 0.3s ease-in-out',
      position: 'relative' // Add position relative to allow absolute positioning of children
    };
    
    // If we have an image URL, add background image styling
    if (imageUrl && value !== null) {
      // Use specific background positions for each tile position as specified
      let bgPosition;
      
      // Map each position to its specific background position
      switch (value) {
        case 1:
          bgPosition = '0% 0%'; // P1of6
          break;
        case 2:
          bgPosition = '50% 0%'; // P2of6
          break;
        case 3:
          bgPosition = '100% 0%'; // P3of6
          break;
        case 4:
          bgPosition = '0% 100%'; // P4of6
          break;
        case 5:
          bgPosition = '50% 100%'; // P5of6
          break;
        default:
          bgPosition = '0% 0%';
      }
      
      return {
        ...baseStyle,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: '300% 200%', // 300% width (3 cols), 200% height (2 rows)
        backgroundPosition: bgPosition,
        backgroundRepeat: 'no-repeat',
      };
    }
    
    return baseStyle;
  };
  
  // If value is null, this is the empty tile
  if (value === null) {
    return (
      <div 
        id={`P${position}of6`} 
        className="tile empty-tile"
        style={getStyle()}
        onClick={onClick}
      />
    );
  }

  return (
    <div 
      id={`P${position}of6`} 
      className="tile"
      style={getStyle()}
      onClick={onClick}
    >
      {/* Always show the tile number */}
      <span className="tile-number">{value}</span>
    </div>
  );
}

export default Tile;
