import React, { useContext, useEffect, useState } from 'react';
import BeamsContext from '../../../myContext/BeamsContext';
import ButtonIcon from '../../buttons/ButtonIcon';
import DeleteMassage from '../../messages/DeleteMassage';

function PinRollerSupportsDetails({ type, beamIndex, supportIndex }) {
  const { beams, setBeams, validChecks } = useContext(BeamsContext);
  const [editMode, setEditMode] = useState(false);
  const [nameInputValue, setNameInputValue] = useState(beams[beamIndex].supports[type][supportIndex].name);
  const [positionInputValue, setPositionInputValue] = useState(beams[beamIndex].supports[type][supportIndex].position);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    const prevBeams = [...beams];
    prevBeams[beamIndex].supports[type][supportIndex].position = parseInt(positionInputValue);
    setBeams(prevBeams);
    // eslint-disable-next-line
  }, [positionInputValue, nameInputValue]);

  const onPositionChange = (e) => {
    const newVal = e.target.value;
    if (validChecks.isValidPositionSupport(newVal, beamIndex)) {
      setPositionInputValue(newVal);
    }
  }

  const onNameChange = (e) => {
    setNameInputValue(e.target.value);
  }

  const onConfirmButtonClick = () => {
    if (validChecks.isValidName(nameInputValue, beams[beamIndex].supports[type][supportIndex].name) && nameInputValue !== "") {
      const prevBeams = [...beams];
      prevBeams[beamIndex].supports[type][supportIndex].name = nameInputValue;
      setBeams(prevBeams);
      setEditMode(false);
    }
  }

  const onEditButtonClick = () => {
    setEditMode(true);
  }

  const onCancelButtonClick = () => {
    setNameInputValue(beams[beamIndex].supports[type][supportIndex].name);
    setEditMode(false);
  }

  const toggleDeleteMode = () => {
    setDeleteMode(prev => !prev);
  }

  const onDeleteMessageClick = () => {
  const prevBeams = [...beams];
  prevBeams[beamIndex].supports[type].splice(supportIndex, 1);
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
            <span className='title'>{type}</span>
            <label htmlFor='name-pin' className='property'>Name: </label>
            <input id='name-pin' className='beam-input' type="text" value={nameInputValue} onChange={onNameChange} />
            <label htmlFor='pos-pin' className='property'>Position: </label>
            <input /* step="0.1" */ id='pos-pin' className='beam-input' type="number" value={positionInputValue} onChange={onPositionChange} />
          </div>
          :
          <div className='beam-crud-container'>
            <span className='title'>{type}</span>
            <span><span className='property'>Name: </span>{nameInputValue}</span>
            <span><span className='property'>Position: </span>{positionInputValue}</span>
          </div>
      }
      {deleteMode && <DeleteMassage onConfirmClick={onDeleteMessageClick} onCancelClick={toggleDeleteMode} onBackgroundClick={toggleDeleteMode} />}
    </div>
  )
}

export default PinRollerSupportsDetails;