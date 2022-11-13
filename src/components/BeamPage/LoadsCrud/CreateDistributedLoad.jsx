import React, { useContext, useState } from 'react'
import BeamsContext from '../../../myContext/BeamsContext';
import ButtonIcon from '../../buttons/ButtonIcon';

function CreateDistributedLoad({ beamIndex, onCancel }) {
  const { beams, setBeams, validChecks } = useContext(BeamsContext);
  const [nameInputValue, setNameInputValue] = useState("");
  const [position1InputValue, setPosition1InputValue] = useState(0);
  const [position2InputValue, setPosition2InputValue] = useState(beams[beamIndex].l);
  const [value1InputValue, setValue1InputValue] = useState(-1);
  const [value2InputValue, setValue2InputValue] = useState(-1);

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

  const onConfirmButtonClick = () => {
    if ((validChecks.isValidName(nameInputValue) && nameInputValue !== "")){
      const prevBeams = [...beams];
      prevBeams[beamIndex].loads.distributedLoads.push({
        name: nameInputValue,
        position1: parseInt(position1InputValue),
        position2: parseInt(position2InputValue),
        value1: parseInt(value1InputValue),
        value2: parseInt(value2InputValue)
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
        <span className='title'>Distributed Load</span>
        <label htmlFor='name-dis' className='property'>Name: </label>
        <input className='beam-input' id='name-dis' type="text" value={nameInputValue} onChange={onNameChange} />
        <label htmlFor='start-pos-dis' className='property'>Start: </label>
        <input /* step="0.1" */ className='beam-input' id='start-pos-dis' type="number" value={position1InputValue} onChange={onPosition1Change} />
        <label htmlFor='end-pos-dis' className='property'>End: </label>
        <input /* step="0.1" */ className='beam-input' id='end-pos-dis' type="number" value={position2InputValue} onChange={onPosition2Change} />
        <label htmlFor='start-val-dis' className='property'>Start Value: </label>
        <input /* step="0.1" */ className='beam-input' id='start-val-dis' type="number" value={value1InputValue} onChange={e => setValue1InputValue(e.target.value)} />
        <label htmlFor='end-val-dis' className='property'>End Value: </label>
        <input /* step="0.1" */ className='beam-input' id='end-val-dis' type="number" value={value2InputValue} onChange={e => setValue2InputValue(e.target.value)} />
      </div>

    </div>
  )
}

export default CreateDistributedLoad;