import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>, 

)


// need to enable the strict mode later, but disabled for now due to double-checking of rendering
// which shows different output or repeated onces for console.log outputs
