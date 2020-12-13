import React, { useState } from 'react'
import { getAllPossibleResults } from '../api/api'
import { htmlSnippetToString } from '../utils/api-utils'

import './Result.sass'

export const Result = ({ value }) => {
  const { title, snippet } = value

  const [langlinks, setLanglinks] = useState([])

  const handleClick = () => {
    getAllPossibleResults(title)
      .then(res => setLanglinks(res))
  }

  return (
    <div className="result" onClick={handleClick}>
      <h1>
        {title}
      </h1>
      <span>{`${htmlSnippetToString(snippet)} ...`}</span>
      {langlinks && langlinks.map(langlink => (
        <p>{langlink['*']}</p>
      ))}
    </div>
  )
}
