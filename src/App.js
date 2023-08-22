import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout/MainLayout';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import createGuest from './HOC/createGuest';
import Home from './components/Home/Home';
import createAuth from './HOC/createAuth';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path='/' element={createAuth(<Home/>)} />
          <Route path='/login' element={createGuest(<Login />)} />
          <Route path='/signup' element={createGuest(<Signup />)} />
          <Route path='*' element={<h4>404 Not found</h4>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
