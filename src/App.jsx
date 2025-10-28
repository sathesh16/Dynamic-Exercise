import { useContext, useState } from 'react'
import './App.css'
import { ThemeContext } from './Theme'
import Header from './components/header/Header'
import ImagesUpload from './components/imagesUpload/ImagesUpload'

function App() {
  // const [count, setCount] = useState(0)

  const { theme } = useContext(ThemeContext)

  return (
    <div className={`Site ${theme}`}>
      <Header />
      <ImagesUpload/>
    </div>

  )
}

export default App
