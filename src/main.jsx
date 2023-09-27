import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ScreenSizeContextProvider } from './context/ScreenSizeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ScreenSizeContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ScreenSizeContextProvider>
)
      
