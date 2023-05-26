import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Router from './router';
import DrawerJiraBug from './components/JiraBugs/DrawerJiraBug'

import './pages/scss/isLoading.scss'
function App() {

  return (
    <BrowserRouter>
      <DrawerJiraBug />
      <Router />
    </BrowserRouter>
  );
}

export default App;
