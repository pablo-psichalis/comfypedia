import React, { useState } from 'react';
import { getAlternatedMergedSearches } from '../../api/api'

import { Result } from '../../components/Result'

import './Main.sass';

const Main = () => {

  const [searchText, setSearchText] = useState('')
  const [results, setResults] = useState([])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    getAlternatedMergedSearches(searchText).then(res => {
      setResults(res)
    })
  }

  return (
    <div id="main">
      <header className="main-header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit">
            Buscar!
          </button>
        </form>
      </header>
      <section id="results">
        {results && results.map(res =>
          <Result key={res.pageid} value={res} />
        )}
      </section>
    </div>
  );
}

export default Main;
