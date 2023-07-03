import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import SideBar from './components/SideBar'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        <SideBar/>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App