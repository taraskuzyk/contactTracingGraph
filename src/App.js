import React from 'react';
import './App.scss';


import Router from './app/router/router'
import {useHistory, useLocation} from 'react-router-dom'

function App() {
  const history = useHistory()
  const location = useLocation()
  console.log('history:', history, )
  console.log('location:', location)

  return (
    <Router />
  )
}

export default App;
