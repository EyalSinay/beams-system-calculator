import '../css/main.style.css'
// import React, { useContext, useState } from 'react'
// import BeamsContext from '../../myContext/BeamsContext';
import BeamLink from './BeamLink';
import ButtonIcon from '../buttons/ButtonIcon';
import BeamLinkModify from './BeamLinkModify';
import DeleteMassage from '../messages/DeleteMassage';
import { useMainService } from '../../services/main/main.services';

function Main() {
  const { mainServiceStates, mainServiceHandlers } = useMainService()

  const {
    cancelAddBeam,
    cancelAlertDeleteMessage,
    cancelEditMode,
    confirmAlertDeleteMessage,
    confirmAddNewBeam,
    confirmEditBeam,
    onAddClick,
    onDeleteClick,
    openEditMode
  } = mainServiceHandlers

  const { alertAfterDeleteMessage, beams, modifyNewBeamMode } = mainServiceStates

  const getBeamsLinks = () => {
    return beams.map(beam =>
      <BeamLink
        key={beam.id}
        beam={beam}
        onEditClick={openEditMode}
        onDeleteClick={onDeleteClick}
        onConfirmClick={confirmEditBeam}
        onCancelClick={cancelEditMode}
      />);
  }

  return (
    <div className='main-container'>
      <ButtonIcon
        type={modifyNewBeamMode ? "minus" : "add"}
        onButtonClick={onAddClick} />
      {modifyNewBeamMode
        && <BeamLinkModify
          onCancelClick={cancelAddBeam}
          onConfirmClick={confirmAddNewBeam}
          modifyStatus="add" />}
      <div className="links-beams-container">
        {getBeamsLinks()}
      </div>
      {alertAfterDeleteMessage !== 0
        && <DeleteMassage
          onBackgroundClick={cancelAlertDeleteMessage}
          onConfirmClick={confirmAlertDeleteMessage}
          onCancelClick={cancelAlertDeleteMessage} />}
    </div>
  );
}

export default Main;