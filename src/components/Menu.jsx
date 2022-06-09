import './css/menu.style.css'
import React from 'react'

function Menu() {
  return (
    <aside className='menu-container'>
      <button className='menu-btn'>Save</button>
      <button className='menu-btn'>Print</button>
      <button className='menu-btn'>Units</button>
      <button className='menu-btn'>Clear All</button>
      <button className='menu-btn'>Dark Mode</button>
    </aside>
  )
}

export default Menu;