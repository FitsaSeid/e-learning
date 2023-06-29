import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './global/Sidebar';
import Question from './pages/Question';
import Test from './global/Test';
import { useSelector } from 'react-redux';
import RequireAuth from './auth/RequireAuth';
import PersistAuth from './auth/PersistAuth';
function App() {
  const { theme } = useSelector(state => state.theme)

  return (
    <div id={theme}>
      <Routes>
        <Route Component={PersistAuth} >
          <Route path='/' exact element={<Home />} />
          <Route Component={RequireAuth} >
            <Route Component={Sidebar}>
              <Route path='/dashboard' element={<Home />} />
              <Route path='/question' element={<Question />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
