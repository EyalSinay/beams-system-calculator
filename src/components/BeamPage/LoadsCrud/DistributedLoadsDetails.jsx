import React, { useState } from 'react'
import ButtonIcon from '../../buttons/ButtonIcon'

function DistributedLoadsDetails({ details }) {
  const [editMode, setEditMode] = useState(false);
  const [nameInputValue, setNameInputValue] = useState("");
  const [position1InputValue, setPosition1InputValue] = useState("");
  const [position2InputValue, setPosition2InputValue] = useState("");
  const [value1InputValue, setValue1InputValue] = useState("");
  const [value2InputValue, setValue2InputValue] = useState("");

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
        <span className='title'>Distributed Load</span>
        <label htmlFor='name-dis' className='property'>Name: </label>
        <input className='beam-input' id='name-dis' type="text" placeholder={details.name} value={nameInputValue} onChange={e => setNameInputValue(e.target.value)}/>
        <label htmlFor='start-pos-dis' className='property'>Start: </label>
        <input className='beam-input' id='start-pos-dis' type="number" placeholder={details.position1} value={position1InputValue} onChange={e => setPosition1InputValue(e.target.value)}/>
        <label htmlFor='end-pos-dis' className='property'>End: </label>
        <input className='beam-input' id='end-pos-dis' type="number" placeholder={details.position2} value={position2InputValue} onChange={e => setPosition2InputValue(e.target.value)}/>
        <label htmlFor='start-val-dis' className='property'>Start Value: </label>
        <input className='beam-input' id='start-val-dis' type="number" placeholder={details.value1} value={value1InputValue} onChange={e => setValue1InputValue(e.target.value)}/>
        <label htmlFor='end-val-dis' className='property'>End Value: </label>
        <input className='beam-input' id='end-val-dis' type="number" placeholder={details.value2} value={value2InputValue} onChange={e => setValue2InputValue(e.target.value)}/>
      </div>
        :
      <div className='beam-crud-container'>
        <span className='title'>Distributed Load</span>
        <span><span className='property'>Name: </span>{details.name}</span>
        <span><span className='property'>Start: </span>{details.position1}</span>
        <span><span className='property'>End: </span>{details.position2}</span>
        <span><span className='property'>Start Value: </span>{details.value1}</span>
        <span><span className='property'>End Value: </span>{details.value2}</span>
      </div>
      }
    </div>
  )
}

export default DistributedLoadsDetails;