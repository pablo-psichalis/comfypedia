import { apiQuery } from '../utils/api-utils'
import lang from '../utils/lang-codes'

export const searchPages = (query, langCode = lang.ENGLISH) => {
  const params = {
    list: 'search',
    srsearch: query
  }
  return (
    apiQuery(params, langCode)
      .then(data => {
        const pages = data.query.search
        pages.forEach(r => r.lang = langCode)
        return pages
      })
  )
} 

export const getAlternatedMergedSearches = (queryText) => new Promise((resolve, reject) => {
  const searchLanguages = [lang.ENGLISH, lang.CHINESE, lang.SPANISH]
  Promise.all(searchLanguages.map((langCode) => searchPages(queryText, langCode)))
    .then((allQueryResults) => {
      const nonEmptyResults = allQueryResults.filter(array => !!array.length)
      const mergedResults = nonEmptyResults.length
        ? nonEmptyResults
          .filter(array => array.length)
          .reduce((r, array) => (array.forEach((a, i) => (r[i] = r[i] || []).push(a)), r), [])
          .reduce((a, b) => a.concat(b))
        : []
      resolve(mergedResults)
    })
    .catch(err => reject(err))
})

export const getWikipediaUrlFromPageId = (pageId, lang) => {
  const params = {
    prop: 'info',
    inprop: 'url',
    pageids: pageId
  }
  
  return apiQuery(params, lang)
    .then(res => {
      const pages = res.query && res.query.pages
      if (pages) {
        const myPage = Object.values(pages).pop()
        return myPage.fullurl
      } else {
        return null
      }
    })
}



export default searchPages
