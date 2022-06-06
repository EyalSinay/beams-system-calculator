import React from 'react'

const ButtonIcon = ({type, onButtonClick=() => {}}) => <div className={`${type}-btn btn`} onClick={onButtonClick} />

export default ButtonIcon;