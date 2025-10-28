import React, { useContext } from 'react'
import './header.css'
import viteLogo from '/vite.svg'
import { ThemeContext } from '../../Theme'
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <div className='header'>
      <img src={viteLogo} alt="vite logo" />
      <button onClick={() => toggleTheme()}>Toggle theme</button>
    </div>
  )
}

export default Header
