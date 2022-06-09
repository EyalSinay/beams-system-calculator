import React, { useContext, useState } from 'react';
import BeamsContext from '../../../myContext/BeamsContext';
import ButtonIcon from '../../buttons/ButtonIcon';

function CreateFixedSupport({ beamIndex, onCancel }) {
  const { beams, setBeams, validChecks } = useContext(BeamsContext);
  const [nameInputValue, setNameInputValue] = useState("");
  const [positionInputValue, setPositionInputValue] = useState("Start");

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
    const pos = positionInputValue === "End" ? beams[beamIndex].l : 0;
    if ((validChecks.isValidName(nameInputValue) && nameInputValue !== "")
      &&
      (validChecks.isValidPositionSupport(pos, beamIndex))
    ) {
      const prevBeams = [...beams];
      prevBeams[beamIndex].supports.fixedSupports.push({
        name: nameInputValue,
        position: parseInt(pos),
        reactionY: 0,
        reactionX: 0,
        reactionM: 0
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
        <span className='title'>Fixed Support</span>
        <label htmlFor='name-fixed' className='property'>Name: </label>
        <input id='name-fixed' className='beam-input' type="text" value={nameInputValue} onChange={onNameChange} />
        <span className='property'>Position:</span>
        <div onChange={onPositionChange}>
          <input defaultChecked={positionInputValue === "Start"} type='radio' id='start-fixed' name='pos-fixed' value='Start' />
          <label htmlFor="start-fixed">Start</label>
          <input defaultChecked={positionInputValue === "End"} type='radio' id='end-fixed' name='pos-fixed' value='End' />
          <label htmlFor="end-fixed">End</label>
        </div>
      </div>

    </div>
  )
}

export default CreateFixedSupport;