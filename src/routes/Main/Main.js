import React, { useEffect, useState } from 'react';
import { getAlternatedMergedSearches } from '../../api/api'

import { Result } from '../../components/Result'

import './Main.sass';

const Main = () => {

  const [searchText, setSearchText] = useState('')
  const [results, setResults] = useState(null)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (searchText) {
      doSearch(searchText)
    }
  }

  useEffect(() => {
    let timeout = null
    if (searchText) {
      timeout = setTimeout(() => {
        doSearch(searchText)
      }, 300)
    }
    return () => timeout && clearTimeout(timeout)
  }, [searchText])
  
  const doSearch = (searchText) => {
    getAlternatedMergedSearches(searchText).then(res => {
      setResults(res)
    })
  }

  return (
    <div id="main">
      <header className="main-header">
        <form onSubmit={handleSubmit}>
          <div className="search-wrapper">
            <input
              className="search-input"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </form>
      </header>
      <section id="results">
        {results && results.map(res =>
          <Result key={res.pageid} value={res} />
        )}
        {(results && !results.length) &&
          <div className="no-results">
            <span>No results for <b>{searchText}</b></span>
          </div>
        }
      </section>
    </div>
  );
}

export default Main;
