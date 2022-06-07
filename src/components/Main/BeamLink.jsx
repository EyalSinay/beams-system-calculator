import '../css/BeamLink.style.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import BeamSection from '../BeamComponents/BeamSection';
import ButtonIcon from '../buttons/ButtonIcon';
import StatusLights from '../StatusLights';
import BeamLinkModify from './BeamLinkModify';
import getColorBeam from '../../services/getColorBeamSection';

function BeamLink({ beam, onEditClick, onDeleteClick, onConfirmClick, onCancelClick }) {

    const getImage = () => {
        if(beam.material === "concrete" || beam.material === "wood"){
            return <BeamSection b={beam.b} h={beam.h} WHSvg={150} fillColor={getColorBeam(beam.material)} />
        }else if(beam.material === "steel"){
            return <div className={`profile-img profile-img-${beam.steelProperty.name.slice(0, 3)}`} /> 
        }else{
            return <div>No image</div>
        }
    }

    if (beam.onEdit) {
        return (
            <BeamLinkModify beam={beam} onConfirmClick={onConfirmClick} onCancelClick={onCancelClick} modifyStatus="edit"/>
        )
    }

    return (
        <div className='beam-link-container' id={`${beam.id}-container`}>
            <StatusLights green="on" />

            {getImage()}
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