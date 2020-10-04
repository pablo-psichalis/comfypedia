import React from 'react';
import './Main.sass';

import { searchPages } from '../../api/api'

const Main = () => {

  const handleSubmit = (evt) => {
    console.log(evt)
    evt.preventDefault()
    const searchText = evt.target.value
    searchPages(searchText)
  }

  return (
    <div id="main">
      <header className="main-header">
        <p>
          Search here:
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

export default Main;
