import './css/navbar.style.css'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import BeamsContext from '../myContext/BeamsContext';
import { useParams } from 'react-router-dom';

function NavBar() {
  const { beams } = useContext(BeamsContext);
  const [CURRENT_INDEX, setCURRENT_INDEX] = useState(-1);

  useEffect(() => {
    setCURRENT_INDEX(() => {
      return beams.findIndex(beam => beam.name === window.location.pathname.substring(1));
    });
    // eslint-disable-next-line
  }, [CURRENT_INDEX]);

  const gePath = () => {
    if (CURRENT_INDEX < 0) {
      return "";
    } else {
      return beams[CURRENT_INDEX].name;
    }
  }
  
  return (
    <nav className='nav-container'>
      {/* <div className="nav-link btn-menu"> */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px"><path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z" /></svg> */}
      {/* </div> */}
      <div className="links-container">
        <NavLink className="nav-link" data-allowed={CURRENT_INDEX < 0 ? "false" : "true"} to={`/${gePath()}`}>←</NavLink>
        <NavLink className="nav-link" to="/">Main</NavLink>
        <NavLink className="nav-link" data-allowed={CURRENT_INDEX < 0 ? "false" : "true"} to={`/${gePath()}`}>→</NavLink>
      </div>
      {/* <div className='about-contact-container'>
        <NavLink className="nav-link" to="/">{'About&Contact'}</NavLink>
      </div> */}
    </nav>
  )
}

export default NavBar;