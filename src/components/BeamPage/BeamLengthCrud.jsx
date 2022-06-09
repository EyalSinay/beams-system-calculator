import React, { useContext, useEffect, useState } from 'react';
import BeamsContext from '../../myContext/BeamsContext';
import ButtonIcon from '../buttons/ButtonIcon';

function BeamLengthCrud({ index }) {
    const { beams, setBeams, validChecks } = useContext(BeamsContext);
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(beams[index].l);

    useEffect(() => {
        const prevArr = [...beams];
        prevArr[index].l = inputValue;
        setBeams(prevArr);
        // eslint-disable-next-line
    }, [inputValue]);

    const onEditClick = () => {
        setEditMode(prev => !prev);
    }

    const onLengthChang = (e) => {
        const valid = validChecks.isValidLength(e.target.value, index);
        if (valid.validBool) {
            setInputValue(e.target.value);
        } else {
            setInputValue(valid.maxValid);
        }
    }

    return (
        <div className='length-crud-container'>
            <ButtonIcon type="edit" onButtonClick={onEditClick} />
            <h4>Beam Length:</h4>
            {
                editMode
                    ?
                    <input className='beam-input' type="number" value={inputValue} onChange={onLengthChang} />
                    :
                    <span className='length-beam-text'>{beams[index].l}</span>
            }
        </div>
    )
}

export default BeamLengthCrud;