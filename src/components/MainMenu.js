import React from 'react';

function MainMenu({ onScreenChange }) {
  return (
    <section className="main-menu">
      <div id="game-bkg"></div>
      <div id="game-title">SLIDE PUZZLE GAME</div>
      <div 
        id="game-arcade" 
        onClick={() => onScreenChange('arcade')}
        className="menu-item"
      >
        ARCADE
      </div>
      <div 
        id="game-custom" 
        onClick={() => onScreenChange('custom')}
        className="menu-item"
      >
        CUSTOM
      </div>
      <div 
        id="game-credits" 
        onClick={() => onScreenChange('credits')}
        className="menu-item"
      >
        CREDITS
      </div>
    </section>
  );
}

export default MainMenu;
