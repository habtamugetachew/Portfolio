import React from 'react';
import './Lamp.css';

const Lamp = ({ isOn, toggleLamp }) => {
  return (
    <div className={`lamp-container ${isOn ? 'is-on' : ''}`}>
      <div className="lamp">
        {/* The glowing light effect */}
        <div className="lamp-glow"></div>
        
        {/* The lamp shade */}
        <div className="lamp-shade"></div>
        
        {/* The lamp stand */}
        <div className="lamp-stand"></div>
        
        {/* The lamp base */}
        <div className="lamp-base"></div>
        
        {/* The interactive pull string */}
        <div className="lamp-string-container" onClick={toggleLamp}>
          <div className="lamp-string"></div>
          <div className="lamp-bead"></div>
        </div>
      </div>
    </div>
  );
};

export default Lamp;
