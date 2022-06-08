import React, { useContext, useEffect, useState } from 'react';
import BeamsContext from '../../../myContext/BeamsContext';
import ButtonIcon from '../../buttons/ButtonIcon';
import DeleteMassage from '../../messages/DeleteMassage';

function CreatePointLoad({ beamIndex, onCancel }) {
  const { beams, setBeams, validChecks } = useContext(BeamsContext);
  const [nameInputValue, setNameInputValue] = useState("");
  const [positionInputValue, setPositionInputValue] = useState(0);
  const [valueInputValue, setValueInputValue] = useState(-1);

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
    if (validChecks.isValidName(nameInputValue) && nameInputValue !== "") {
      const prevBeams = [...beams];
      prevBeams[beamIndex].loads.pointLoads.push({
        name: parseInt(nameInputValue),
        position: parseInt(positionInputValue),
        value: parseInt(valueInputValue)
      });
      setBeams(prevBeams);
      onCancel();
    }
  }

  const onCancelButtonClick = () => {
    onCancel();
  }

  return (
    <div className='beam-crud-main-container'>

      <div className="btns-beam-crud-container">
        <ButtonIcon type="confirm" onButtonClick={onConfirmButtonClick} />
        <ButtonIcon type="cancel" onButtonClick={onCancelButtonClick} />
      </div>

      <div className='beam-crud-container'>
        <span className='title'>Point Load</span>
        <label htmlFor='name-point' className='property'>Name: </label>
        <input id='name-point' className='beam-input' type="text" value={nameInputValue} onChange={onNameChange} />
        <label htmlFor='pos-point' className='property'>Position: </label>
        <input id='pos-point' className='beam-input' type="number" value={positionInputValue} onChange={onPositionChange} />
        <label htmlFor='val-point' className='property'>Value: </label>
        <input id='val-point' className='beam-input' type="number" value={valueInputValue} onChange={e => setValueInputValue(e.target.value)} />
      </div>

    </div>
  )
}

export default CreatePointLoad;