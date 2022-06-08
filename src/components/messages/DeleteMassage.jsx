import '../css/messages.style.css'
import React from 'react'
import ButtonIcon from '../buttons/ButtonIcon'

function DeleteMassage({onBackgroundClick = () => {}, onCancelClick = () => {}, onConfirmClick = () => {}}) {
  const onlyOnBackgroundClick = e => {
    if(e.target === e.currentTarget){
      onBackgroundClick();
    }
  }
  return (
    <div className='delete-msg-main-container msg-main-container' onClick={onlyOnBackgroundClick}>
      <div className="delete-msg-container msg-container">
        <h4>Delete?</h4>
        <div className="confirm-cancel-container">
          <ButtonIcon type="confirm" onButtonClick={onConfirmClick} />
          <ButtonIcon type="cancel" onButtonClick={onCancelClick}/>
        </div>
      </div>
    </div>
  )
}

export default DeleteMassage