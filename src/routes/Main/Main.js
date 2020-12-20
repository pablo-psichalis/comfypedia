import React, { useEffect, useState, useRef } from 'react';
import { getAlternatedMergedSearches } from '../../api/api-search'

import { Result } from '../../components/Result'

import './Main.sass';

const Main = () => {

  const [searchText, setSearchText] = useState('')
  const [results, setResults] = useState(null)

  const searchBar = useRef()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (searchText) {
      doSearch(searchText)
      searchBar.current.blur()
    }
  }

  useEffect(() => {
    let timeout = null
    if (searchText) {
      timeout = setTimeout(() => {
        doSearch(searchText)
      }, 300)
    } else {
      setResults(null)
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
      <header className="main-header" >
        <form onSubmit={handleSubmit}>
          <input
            ref={searchBar}
            className="search-input"
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value) }
          />
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
