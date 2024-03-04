import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ApiData from './components/viewTodo/ApiData.tsx'
import AddTodo from './components/addTodo/AddTodo.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AddTodo/>
    <ApiData />
  </React.StrictMode>,
)
