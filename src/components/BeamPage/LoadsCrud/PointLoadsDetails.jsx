import React, { useState } from 'react';
import ButtonIcon from '../../buttons/ButtonIcon';

function PointLoadsDetails({ details }) {
  const [editMode, setEditMode] = useState(false);
  const [nameInputValue, setNameInputValue] = useState("");
  const [positionInputValue, setPositionInputValue] = useState("");
  const [valueInputValue, setValueInputValue] = useState("");

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
            <span className='title'>Point Load</span>
            <label htmlFor='name-point' className='property'>Name: </label>
            <input id='name-point' className='beam-input' type="text" placeholder={details.name} value={nameInputValue} onChange={e => setNameInputValue(e.target.value)} />
            <label htmlFor='pos-point' className='property'>Position: </label>
            <input id='pos-point' className='beam-input' type="number" placeholder={details.position} value={positionInputValue} onChange={e => setPositionInputValue(e.target.value)} />
            <label htmlFor='val-point' className='property'>Value: </label>
            <input id='val-point' className='beam-input' type="number" placeholder={details.value} value={valueInputValue} onChange={e => setValueInputValue(e.target.value)} />
          </div>
          :
          <div className='beam-crud-container'>
            <span className='title'>Point Load</span>
            <span><span className='property'>Name: </span>{details.name}</span>
            <span><span className='property'>Position: </span>{details.position}</span>
            <span><span className='property'>Value: </span>{details.value}</span>
          </div>
      }
    </div>
  )
}

export default PointLoadsDetails;