import React, { useContext, useEffect, useState } from 'react'
import BeamsContext from '../../../myContext/BeamsContext';
import ButtonIcon from '../../buttons/ButtonIcon';
import DeleteMassage from '../../messages/DeleteMassage';

function DistributedLoadsDetails({ details, beamIndex, loadIndex }) {
  const { beams, setBeams, validChecks } = useContext(BeamsContext);
  const [editMode, setEditMode] = useState(false);
  const [nameInputValue, setNameInputValue] = useState(details.name);
  const [position1InputValue, setPosition1InputValue] = useState(details.position1);
  const [position2InputValue, setPosition2InputValue] = useState(details.position2);
  const [value1InputValue, setValue1InputValue] = useState(details.value1);
  const [value2InputValue, setValue2InputValue] = useState(details.value2);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    const prevBeams = [...beams];
    prevBeams[beamIndex].loads.distributedLoads[loadIndex].position1 = parseInt(position1InputValue);
    prevBeams[beamIndex].loads.distributedLoads[loadIndex].position2 = parseInt(position2InputValue);
    prevBeams[beamIndex].loads.distributedLoads[loadIndex].value1 = parseInt(value1InputValue);
    prevBeams[beamIndex].loads.distributedLoads[loadIndex].value2 = parseInt(value2InputValue);
    setBeams(prevBeams);
  }, [position1InputValue, position2InputValue, value1InputValue, value2InputValue]);

  const onPosition1Change = (e) => {
    const newVal1 = e.target.value;
    if (validChecks.isValidPositionLoad(beamIndex, newVal1, position2InputValue)) {
      setPosition1InputValue(newVal1);
    }
  }
  const onPosition2Change = (e) => {
    const newVal2 = e.target.value;
    if (validChecks.isValidPositionLoad(beamIndex, position1InputValue, newVal2)) {
      setPosition2InputValue(newVal2);
    }
  }

  const onNameChange = (e) => {
    setNameInputValue(e.target.value);
  }

  const onEditButtonClick = () => {
      setEditMode(true);
  }

  const onConfirmButtonClick = () => {
    if (validChecks.isValidName(nameInputValue, beams[beamIndex].loads.distributedLoads[loadIndex].name) && nameInputValue !== "") {
      const prevBeams = [...beams];
      prevBeams[beamIndex].loads.distributedLoads[loadIndex].name = nameInputValue;
      setBeams(prevBeams);
      setEditMode(false);
    }
  }

  const onCancelButtonClick = () => {
    setNameInputValue(beams[beamIndex].loads.distributedLoads[loadIndex].name);
    setEditMode(false);
  }

  const toggleDeleteMode = () => {
    setDeleteMode(prev => !prev);
  }
  const onDeleteMessageClick = () => {
  const prevBeams = [...beams];
  prevBeams[beamIndex].loads.distributedLoads.splice(loadIndex, 1);
  setBeams(prevBeams);
  }

  return (
    <div className='beam-crud-main-container'>
      {
        editMode
          ?
          <div className="btns-beam-crud-container">
            <ButtonIcon type="confirm" onButtonClick={onConfirmButtonClick} />
            <ButtonIcon type="cancel" onButtonClick={onCancelButtonClick} />
          </div>
          :
          <div className='btns-beam-crud-container'>
            <ButtonIcon type="edit" onButtonClick={onEditButtonClick} />
            <ButtonIcon type="delete" onButtonClick={toggleDeleteMode} />
          </div>
      }
      {
        editMode
          ?
          <div className='beam-crud-container'>
            <span className='title'>Distributed Load</span>
            <label htmlFor='name-dis' className='property'>Name: </label>
            <input className='beam-input' id='name-dis' type="text" value={nameInputValue} onChange={onNameChange} />
            <label htmlFor='start-pos-dis' className='property'>Start: </label>
            <input className='beam-input' id='start-pos-dis' type="number" value={position1InputValue} onChange={onPosition1Change} />
            <label htmlFor='end-pos-dis' className='property'>End: </label>
            <input className='beam-input' id='end-pos-dis' type="number" value={position2InputValue} onChange={onPosition2Change} />
            <label htmlFor='start-val-dis' className='property'>Start Value: </label>
            <input className='beam-input' id='start-val-dis' type="number" value={value1InputValue} onChange={e => setValue1InputValue(e.target.value)} />
            <label htmlFor='end-val-dis' className='property'>End Value: </label>
            <input className='beam-input' id='end-val-dis' type="number" value={value2InputValue} onChange={e => setValue2InputValue(e.target.value)} />
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
      {deleteMode && <DeleteMassage onConfirmClick={onDeleteMessageClick} onCancelClick={toggleDeleteMode} onBackgroundClick={toggleDeleteMode} />}
    </div>
  )
}

export default DistributedLoadsDetails;