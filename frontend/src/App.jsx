import { useState } from 'react'
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
