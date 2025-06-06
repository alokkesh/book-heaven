import React from 'react'
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import store from './store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>

    </Router>

  </React.StrictMode>,
)
