import React, { useContext, useEffect, useState } from 'react';
import BeamsContext from '../../../myContext/BeamsContext';
import ButtonIcon from '../../buttons/ButtonIcon';
import DeleteMassage from '../../messages/DeleteMassage';

function FixedSupportsDetails({ details, beamIndex, supportIndex }) {
  const { beams, setBeams, validChecks } = useContext(BeamsContext);
  const [editMode, setEditMode] = useState(false);
  const [nameInputValue, setNameInputValue] = useState(details.name);
  const [positionInputValue, setPositionInputValue] = useState(details.position > 0 ? "End" : "Start");
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    const prevBeams = [...beams];
    const newPos = positionInputValue === "End" ? beams[beamIndex].l : 0;
    prevBeams[beamIndex].supports.fixedSupports[supportIndex].position = newPos;
    setBeams(prevBeams);
  }, [positionInputValue]);

  const onPositionChange = (e) => {
    const newVal = e.target.value === "End" ? beams[beamIndex].l : 0;
    if (validChecks.isValidPositionSupport(newVal, beamIndex)) {
      setPositionInputValue(e.target.value);
    }
  }

  const onNameChange = (e) => {
    setNameInputValue(e.target.value);
  }

  const onConfirmButtonClick = () => {
    if (validChecks.isValidName(nameInputValue, beams[beamIndex].supports.fixedSupports[supportIndex].name) && nameInputValue !== "") {
      const prevBeams = [...beams];
      prevBeams[beamIndex].supports.fixedSupports[supportIndex].name = nameInputValue;
      setBeams(prevBeams);
      setEditMode(false);
    }
  }

  const onEditButtonClick = () => {
    setEditMode(true);
  }

  const onCancelButtonClick = () => {
    setNameInputValue(beams[beamIndex].supports.fixedSupports[supportIndex].name);
    setEditMode(false);
  }

  const toggleDeleteMode = () => {
    setDeleteMode(prev => !prev);
  }
  const onDeleteMessageClick = () => {
  const prevBeams = [...beams];
  prevBeams[beamIndex].supports.fixedSupports.splice(supportIndex, 1);
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
            <span className='title'>Fixed Support</span>
            <label htmlFor='name-fixed' className='property'>Name: </label>
            <input id='name-fixed' className='beam-input' type="text" placeholder={details.name} value={nameInputValue} onChange={onNameChange} />
            <span className='property'>Position:</span>
            <div onChange={onPositionChange}>
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
      {deleteMode && <DeleteMassage onConfirmClick={onDeleteMessageClick} onCancelClick={toggleDeleteMode} onBackgroundClick={toggleDeleteMode} />}
    </div>
  )
}

export default FixedSupportsDetails;