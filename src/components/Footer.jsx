import './css/footer.style.css'
import React from 'react'
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className='footer-container'>
      <NavLink className="nav-link" to="/">{'About&Contact'}</NavLink>
    </footer>
  )
}

export default Footer;