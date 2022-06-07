import React, { useState } from 'react';
import ButtonIcon from '../../buttons/ButtonIcon';

function PinSupportsDetails({ details }) {
  const [editMode, setEditMode] = useState(false);
  const [nameInputValue, setNameInputValue] = useState("");
  const [positionInputValue, setPositionInputValue] = useState("");

  return (
    <div className='beam-crud-main-container'>
      <div className='edit-delete-beam-crud-container'>
        <ButtonIcon type="edit" onButtonClick={() => setEditMode(prev => !prev)} />
        <ButtonIcon type="delete" onButtonClick={() => { }} />
      </div>
      {
        editMode
          ?
          <div className='beam-crud-container'>
            <span className='title'>Pin Support</span>
            <label htmlFor='name-pin' className='property'>Name: </label>
            <input id='name-pin' className='beam-input' type="text" placeholder={details.name} value={nameInputValue} onChange={e => setNameInputValue(e.target.value)} />
            <label htmlFor='pos-pin' className='property'>Position: </label>
            <input id='pos-pin' className='beam-input' type="number" placeholder={details.position} value={positionInputValue} onChange={e => setPositionInputValue(e.target.value)} />
          </div>
          :
          <div className='beam-crud-container'>
            <span className='title'>Pin Support</span>
            <span><span className='property'>Name: </span>{details.name}</span>
            <span><span className='property'>Position: </span>{details.position}</span>
          </div>
      }
    </div>
  )
}

export default PinSupportsDetails;