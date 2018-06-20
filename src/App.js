import React, { Component } from 'react'
import Calendar from './Calendar'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <p className='App-title'>ReactApp</p>
        </header>
        <Calendar />
      </div>
    )
  }
}

export default App
