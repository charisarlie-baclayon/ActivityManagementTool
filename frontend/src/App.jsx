import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ViewActivities from './pages/Teacher/ViewActivities';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path = '/teacher/activities' element={<ViewActivities/>}></Route>
      </Routes>
    </>
  )
}

export default App
