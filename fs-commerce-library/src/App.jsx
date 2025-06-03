// File: src/App.jsx
import React from 'react'
import { FastSpringProvider } from './context/FastSpringContext'
import { BrowserRouter } from 'react-router-dom'
import Checkout from './components/Checkout/Checkout'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
          <FastSpringProvider storefrontURL="assignmentse.test.onfastspring.com/embedded-test">
                <Checkout />
          </FastSpringProvider>
      </BrowserRouter>
    </>
  )
}

export default App
