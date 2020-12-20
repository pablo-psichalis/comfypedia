import React, { useState } from 'react'
import { getAllPossibleResults, getWikipediaUrlFromPageId } from '../api/api'
import { htmlSnippetToString } from '../utils/api-utils'

import './Result.sass'

export const Result = ({ value }) => {
  const { title, snippet, lang } = value

  const handleClick = () => {
    getWikipediaUrlFromPageId(value.pageid, lang)
      .then(url => window.open(url, '_system'))
  }

  return (
    <div className="result" onClick={handleClick}>
      <h1>
        {title}
      </h1>
      <span>{`${htmlSnippetToString(snippet)} ...`}</span>
    </div>
  )
}
