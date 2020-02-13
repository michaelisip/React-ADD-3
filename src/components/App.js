import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './home/home'
import Play from './play/play'
import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/play" exact component={Play} />
    </Router>
  );
}

export default App;
