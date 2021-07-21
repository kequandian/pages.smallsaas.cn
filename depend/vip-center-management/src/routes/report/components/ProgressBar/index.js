import React from 'react';
import './index.css';

export default ({ value = 0.2371 }) => {
  const ratioString = `${(value * 100).toFixed(2)}%`;
  return <div className="report-barBox">
    <div className="report-bar report-level-1"></div>
    <div className="report-bar report-level-2"></div>
    <div className="report-bar report-level-3"></div>
    <div style={getDitStyle(value)} className="report-dot"></div>
    <div style={{
      left: `${area(value, 5, 95)}%`,
    }} className="report-nameplate">{ratioString}</div>
  </div>
}

function getDitStyle(value) {
  return {
    left: `${area(value, 5, 95)}%`,
    background: `${format(colorMap(value))}`
  }
}
function colorMap(value) {
  if (value >= 0 && value <= 0.3)
    return {
      color: 'hsl(300, 100%, Number%)',
      value,
      min: 95,
      max: 96,
    };
  if (value > 0.3 && value <= 0.6)
    return {
      color: 'hsl(41, 90.2%, Number%)',
      value,
      min: 46.3,
      max: 75.9,
    };
  return {
    color: 'hsl(18, 51.5%, Number%)',
    value,
    min: 56.3,
    max: 67.6,
  };
}
function format({ value, color, min, max }) {
  return color.replace('Number', area(1 - value, min, max));
}
function area(value, min, max) {
  return min + (max - min) * value;
}