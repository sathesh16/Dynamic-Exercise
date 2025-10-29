import React, { useContext } from 'react'
import './header.css'
import viteLogo from '/vite.svg'
import { ThemeContext } from '../../Theme'
import { BrowserRouter, Link, Route, Routes } from 'react-router'
import Cart from '../cart/Cart'
import DataGrid from '../datagrid/DataGrid'
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <div className='header'>
      <img src={viteLogo} alt="vite logo" />
      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/cart">Cart</Link>
        <Link to="/datatable">Datatable</Link>
        <Link to="/upload">Image Upload</Link>
        <Link to="/searchdata">SearchData</Link>
        <Link to="/kanban">Kanban</Link>
        <Link to="/chat">Web Socket</Link>
        <Link to="/todolist">To do List</Link>
      </nav>
      <button onClick={() => toggleTheme()}>Toggle theme</button>
    </div>


  )
}

export default Header
