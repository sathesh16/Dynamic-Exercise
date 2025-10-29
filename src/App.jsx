import { useContext, useState } from 'react'
import './App.css'
import { ThemeContext } from './Theme'
import Header from './components/header/Header'
import ImagesUpload from './components/imagesUpload/ImagesUpload'
import DataGrid from './components/datagrid/DataGrid'
import { BrowserRouter, Route, Routes } from 'react-router'
import Cart from './components/cart/Cart'

function App() {
  // const [count, setCount] = useState(0)

  const { theme } = useContext(ThemeContext)

  return (
    <div className={`Site ${theme}`}>
      <BrowserRouter>
        <Header /> {/* This stays constant */}
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/datatable" element={<DataGrid />} />
          <Route path='/upload' element={<ImagesUpload />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
