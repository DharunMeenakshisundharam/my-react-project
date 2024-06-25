import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Signup from './components/Signup'
import Todo from './components/Todo'
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Todo" element={<Todo />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
