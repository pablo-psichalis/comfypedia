import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { searchPages, caca } from './api/api'


function App() {

  useEffect(() => {
    searchPages('Song Jian')
  }, [])

  const handleSubmit = (evt) => {
    console.log(evt)
    evt.preventDefault()
    searchPages('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Test
        </p>

        <form onSubmit={handleSubmit}>
          <input />
          <button type="submit">
            Buscar!
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
