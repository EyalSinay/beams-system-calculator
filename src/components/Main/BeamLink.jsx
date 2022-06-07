import '../css/BeamLink.style.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import ButtonIcon from '../buttons/ButtonIcon';
import StatusLights from '../StatusLights';
import BeamLinkModify from './BeamLinkModify';
import getImage from '../../services/getImagesSections';

function BeamLink({ beam, onEditClick, onConfirmClick, onCancelClick, onDeleteClick }) {

    if (beam.onEdit) {
        return (
            <BeamLinkModify beam={beam} onConfirmClick={onConfirmClick} onCancelClick={onCancelClick} modifyStatus="edit"/>
        )
    }

    return (
        <div className='beam-link-container' id={`${beam.id}-container`}>
            <StatusLights green="on" />

            {getImage(beam)}
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
            <NavLink className="enter-link" to={`/${beam.name}`}>
                <ButtonIcon type="enter" />
            </NavLink>
        </div>
    )
}

export default BeamLink