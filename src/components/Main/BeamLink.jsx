import '../css/BeamLink.style.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import BeamSection from '../BeamComponents/BeamSection';
import ButtonIcon from '../buttons/ButtonIcon';
import StatusLights from '../StatusLights';
import BeamLinkModify from './BeamLinkModify';

function BeamLink({ beam, onEditClick, onDeleteClick, onConfirmClick, onCancelClick }) {


    if (beam.onEdit) {
        return (
            <BeamLinkModify beam={beam} onConfirmClick={onConfirmClick} onCancelClick={onCancelClick}/>
        )
    }

    return (
        <div className='beam-link-container' id={`${beam.id}-container`}>
            <StatusLights green="on" />

            <BeamSection b={beam.b} h={beam.h} WHSvg={150} />
            <div className='beam_details'>
                <div className="details">
                    <h3 className='details__beam-name'>{beam.name}</h3>
                    <p className='details__beam-material'>{beam.material}</p>
                </div>
                <div className='edit-delete-container'>
                    <ButtonIcon type="edit" onButtonClick={() => onEditClick(beam.id)} />
                    <ButtonIcon type="delete" onButtonClick={() => onDeleteClick(beam.id)} />
                </div>
            </div>
            <NavLink className="enter-link" to={`/${beam.id}`}>
                <ButtonIcon type="enter" />
            </NavLink>
        </div>
    )
}

export default BeamLink