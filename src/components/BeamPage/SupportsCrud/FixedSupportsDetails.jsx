import React, { useEffect, useState } from 'react';
import ButtonIcon from '../../buttons/ButtonIcon';

function FixedSupportsDetails({ details }) {
  const [editMode, setEditMode] = useState(false);
  const [nameInputValue, setNameInputValue] = useState("");
  const [positionInputValue, setPositionInputValue] = useState("");

  useEffect(() => {
    setPositionInputValue(details.position > 0 ? "End" : "Start")
  },[]);

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
            <span className='title'>Fixed Support</span>
            <label htmlFor='name-fixed' className='property'>Name: </label>
            <input id='name-fixed' className='beam-input' type="text" placeholder={details.name} value={nameInputValue} onChange={e => setNameInputValue(e.target.value)} />
            <span className='property'>Position:</span>
            <div onChange={(e) => setPositionInputValue(e.target.value)}>
              <input defaultChecked={positionInputValue === "Start"} type='radio' id='start-fixed' name='pos-fixed' value='Start' />
              <label htmlFor="start-fixed">Start</label>
              <input defaultChecked={positionInputValue === "End"} type='radio' id='end-fixed' name='pos-fixed' value='End' />
              <label htmlFor="end-fixed">End</label>
            </div>
          </div>
          :
          <div className='beam-crud-container'>
            <span className='title'>Fixed Support</span>
            <span><span className='property'>Name: </span>{details.name}</span>
            <span><span className='property'>Position: </span>{details.position > 0 ? "End" : "Start"}</span>
          </div>
      }
    </div>
  )
}

export default FixedSupportsDetails;