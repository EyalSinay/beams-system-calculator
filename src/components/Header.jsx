import './css/header.style.css'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
// import BeamsContext from '../myContext/BeamsContext';

function Header() {
  // const { beams } = useContext(BeamsContext);

  return (
    <div className='header-container'>
      <NavLink to="/">Main</NavLink>
    </div>
  )
}

export default Header