import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Graphic from './components/graphic'
import Control from './components/control'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/graphic'>
          <Graphic />
        </Route>
        <Route path='/'>
          <Control />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
