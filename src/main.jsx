import React from 'react'
import ReactDOM from 'react-dom/client'

import { QuioscoProvider } from './context/QuioscoProvider'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        {/* Agrega el context que se pasa a toda la pagina */}

          <App />

  </React.StrictMode>,
)