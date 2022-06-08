import React, { useState } from 'react';
import CreateDistributedLoad from '../LoadsCrud/CreateDistributedLoad';
import CreatePointLoad from '../LoadsCrud/CreatePointLoad';
import CreatePinRollerSupport from '../SupportsCrud/CreatePinRollerSupport';
import CreateFixedSupport from '../SupportsCrud/CreateFixedSupport';

function AddLoad({ type, beamIndex, onCancel }) {
  const [bool1, setBool1] = useState(false);
  const [bool2, setBool2] = useState(false);
  const [bool3, setBool3] = useState(false);

  if (type === "Loads") {
    return (
      <>
        {!bool1 && !bool2 ? <div className='create-mode-btn-container'>
          <button className='create-mode-btn' onClick={() => setBool1(true)}>Distributed Load</button>
          <button className='create-mode-btn' onClick={() => setBool2(true)}>Point Load</button>
        </div> : ""}
        {bool1 && <CreateDistributedLoad beamIndex={beamIndex} onCancel={onCancel} />}
        {bool2 && <CreatePointLoad beamIndex={beamIndex} onCancel={onCancel} />}
      </>
    );
  }
  if (type === "Supports") {
    return (
      <>
        {!bool1 && !bool2 && !bool3 ? <div className='create-mode-btn-container'>
          <button className='create-mode-btn' onClick={() => setBool1(true)}>Pin Support</button>
          <button className='create-mode-btn' onClick={() => setBool2(true)}>Roller Support</button>
          <button className='create-mode-btn' onClick={() => setBool3(true)}>Fixed Support</button>
        </div> : ""}
        {bool1 && <CreatePinRollerSupport type="pinSupports" beamIndex={beamIndex} onCancel={onCancel} />}
        {bool2 && <CreatePinRollerSupport type="rollerSupports" beamIndex={beamIndex} onCancel={onCancel} />}
        {bool3 && <CreateFixedSupport beamIndex={beamIndex} onCancel={onCancel}/>}
      </>
    );
  }

}

export default AddLoad;