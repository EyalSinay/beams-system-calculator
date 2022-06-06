import './css/status-lights.style.css'
import React, { useEffect, useState } from 'react';

function StatusLights({ red = "off", yellow = "off", green = "off" }) {
  const [redLight, setRedLight] = useState('off');
  const [yellowLight, setYellowLight] = useState('off');
  const [greenLight, setGreenLight] = useState('off');

  useEffect(() => {
    if (red === "on") {
      setRedLight("on");
    } else {
      setRedLight("off");
    }
  }, [red]);

  useEffect(() => {
    if (yellow === "on") {
      setYellowLight("on");
    } else {
      setYellowLight("off");
    }
  }, [yellow]);

  useEffect(() => {
    if (green === "on") {
      setGreenLight("on");
    } else {
      setGreenLight("off");
    }
  }, [green]);

  return (
    <div className='StatusLights status-btn'>
      <div className='red-light light' light={redLight} />
      <div className='yellow-light light' light={yellowLight} />
      <div className='green-light light' light={greenLight} />
    </div>
  )
}

export default StatusLights;