import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ApiData from './components/viewTodo/ApiData.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiData />
  </React.StrictMode>,
)
