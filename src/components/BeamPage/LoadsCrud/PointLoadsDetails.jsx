import React, { useContext, useEffect, useState } from 'react';
import BeamsContext from '../../../myContext/BeamsContext';
import ButtonIcon from '../../buttons/ButtonIcon';
import DeleteMassage from '../../messages/DeleteMassage';

function PointLoadsDetails({ details, beamIndex, loadIndex }) {
  const { beams, setBeams, validChecks } = useContext(BeamsContext);
  const [editMode, setEditMode] = useState(false);
  const [nameInputValue, setNameInputValue] = useState(details.name);
  const [positionInputValue, setPositionInputValue] = useState(details.position);
  const [valueInputValue, setValueInputValue] = useState(details.value);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {

    const prevBeams = [...beams];
    prevBeams[beamIndex].loads.pointLoads[loadIndex].position = parseInt(positionInputValue);
    prevBeams[beamIndex].loads.pointLoads[loadIndex].value = parseInt(valueInputValue);
    setBeams(prevBeams);
    // eslint-disable-next-line
  }, [positionInputValue, valueInputValue, nameInputValue]);

  const onPositionChange = (e) => {
    const newVal = e.target.value;
    if (validChecks.isValidPositionLoad(beamIndex, newVal)) {
      setPositionInputValue(newVal);
    }
  }

  const onNameChange = (e) => {
    setNameInputValue(e.target.value);
  }

  const onConfirmButtonClick = () => {
    if (validChecks.isValidName(nameInputValue, beams[beamIndex].loads.pointLoads[loadIndex].name) && nameInputValue !== "") {
      const prevBeams = [...beams];
      prevBeams[beamIndex].loads.pointLoads[loadIndex].name = nameInputValue;
      setBeams(prevBeams);
      setEditMode(false);
    }
  }

  const onEditButtonClick = () => {
    setEditMode(true);
  }

  const onCancelButtonClick = () => {
    setNameInputValue(beams[beamIndex].loads.pointLoads[loadIndex].name);
    setEditMode(false);
  }

  const toggleDeleteMode = () => {
    setDeleteMode(prev => !prev);
  }
  const onDeleteMessageClick = () => {
  const prevBeams = [...beams];
  prevBeams[beamIndex].loads.pointLoads.splice(loadIndex, 1);
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
            <span className='title'>Point Load</span>
            <label htmlFor='name-point' className='property'>Name: </label>
            <input id='name-point' className='beam-input' type="text" value={nameInputValue} onChange={onNameChange} />
            <label htmlFor='pos-point' className='property'>Position: </label>
            <input id='pos-point' className='beam-input' type="number" value={positionInputValue} onChange={onPositionChange} />
            <label htmlFor='val-point' className='property'>Value: </label>
            <input id='val-point' className='beam-input' type="number" value={valueInputValue} onChange={e => setValueInputValue(e.target.value)} />
          </div>
          :
          <div className='beam-crud-container'>
            <span className='title'>Point Load</span>
            <span><span className='property'>Name: </span>{details.name}</span>
            <span><span className='property'>Position: </span>{details.position}</span>
            <span><span className='property'>Value: </span>{details.value}</span>
          </div>
      }
      {deleteMode && <DeleteMassage onConfirmClick={onDeleteMessageClick} onCancelClick={toggleDeleteMode} onBackgroundClick={toggleDeleteMode} />}
    </div>
  )
}

export default PointLoadsDetails;