import React, { useState } from 'react'
import './Result.sass'
import { getAllPossibleResults } from '../api/api'

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
      <div dangerouslySetInnerHTML={{ __html: snippet }} />
      {langlinks && langlinks.map(langlink => (
        <p>{langlink['*']}</p>
      ))}
    </div>
  )
}
