import React, { useContext, useState } from 'react';
import BeamsContext from '../../../myContext/BeamsContext';
import ButtonIcon from '../../buttons/ButtonIcon';

function CreatePinSupport({ type, beamIndex, onCancel }) {
  const { beams, setBeams, validChecks } = useContext(BeamsContext);
  const [nameInputValue, setNameInputValue] = useState("");
  const [positionInputValue, setPositionInputValue] = useState(0);

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
    if ((validChecks.isValidName(nameInputValue) && nameInputValue !== "")&&(validChecks.isValidPositionSupport(positionInputValue, beamIndex))) {
      const prevBeams = [...beams];
      if(type === "rollerSupports"){
      prevBeams[beamIndex].supports[type].push({
        name: nameInputValue,
        position: parseInt(positionInputValue),
        reactionY: 0
      });
    } else if (type === "pinSupports"){
      prevBeams[beamIndex].supports[type].push({
        name: nameInputValue,
        position: parseInt(positionInputValue),
        reactionY: 0,
        reactionX: 0
      });
    }
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
        <span className='title'>{type}</span>
        <label htmlFor='name-pin' className='property'>Name: </label>
        <input id='name-pin' className='beam-input' type="text" value={nameInputValue} onChange={onNameChange} />
        <label htmlFor='pos-pin' className='property'>Position: </label>
        <input /* step="0.1" */ id='pos-pin' className='beam-input' type="number" value={positionInputValue} onChange={onPositionChange} />
      </div>

    </div>
  )
}

export default CreatePinSupport;