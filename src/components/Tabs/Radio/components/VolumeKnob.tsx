import React, { useState } from "react";
import "./VolumeKnob.css"; // Stil dosyasını ayarlayacağız

const VolumeKnob = () => {
  const [volume, setVolume] = useState(50); // Başlangıç ses seviyesi 50

  const handleKnobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="volume-knob-container">
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleKnobChange}
        className="volume-knob"
      />
      <div className="volume-display">
        <p>{volume}%</p>
      </div>
    </div>
  );
};

export default VolumeKnob;
