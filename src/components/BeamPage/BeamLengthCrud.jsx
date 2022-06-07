import React, { useContext, useEffect, useState } from 'react';
import BeamsContext from '../../myContext/BeamsContext';
import ButtonIcon from '../buttons/ButtonIcon';

function BeamLengthCrud({ index }) {
    const { beams, setBeams } = useContext(BeamsContext);
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // useEffect(() => {
        // const prevArr = [...beams];
        // prevArr[index].l = inputValue;
        // setBeams(prevArr)
    // }, [inputValue]);

    const onEditClick = () => {
        setEditMode(prev => !prev);
    }

    return (
        <div className='length-crud-container'>
            <ButtonIcon type="edit" onButtonClick={onEditClick} />
            <h4>Beam Length:</h4>
            {
                editMode
                    ?
                    <input className='beam-input' type="number" placeholder={beams[index].l} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    :
                    <span className='length-beam-text'>{beams[index].l}</span>
            }
        </div>
    )
}

export default BeamLengthCrud;