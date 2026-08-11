import React from 'react';
import './GlassIcons.css';

const gradientMapping = {
  gold: 'linear-gradient(135deg, #D4B06A 0%, #F0D79A 100%)',
  blue: 'linear-gradient(135deg, #142B52 0%, #254A7A 100%)',
  violet: 'linear-gradient(135deg, #D4B06A 0%, #b8860b 100%)'
};

const GlassIcons = ({ items, className }) => {
  const getBackgroundStyle = color => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: gradientMapping.gold };
  };

  return (
    <div className={`icon-btns ${className || ''}`}>
      {items.map((item, index) => (
        <button key={index} className={`icon-btn ${item.customClass || ''}`} aria-label={item.label} type="button">
          <span className="icon-btn__back" style={getBackgroundStyle(item.color)}></span>
          <span className="icon-btn__front">
            <span className="icon-btn__icon" aria-hidden="true">
              {item.icon}
            </span>
          </span>
          <span className="icon-btn__label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default GlassIcons;
