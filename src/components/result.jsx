import React from 'react'

export const Result = ({ value }) => {
  const { title, pageid: pageId, snippet } = value
  return (
    <div className="result">
      <li>
        <ul>{title}</ul>
        <ul>{pageId}</ul>
        <ul>{snippet}</ul>
      </li>
    </div>
  )
}
