import { getFullUrl, apiGET } from '../utils/api-utils'
import lang from './lang-codes'

export const searchPages = (query, langCode = lang.ENGLISH) => {
  const params = {
    action: 'query',
    list: 'search',
    format: 'json',
    origin: '*',
    srsearch: query
  }
  const requestUrl = getFullUrl(params, langCode)
  return (
    apiGET(requestUrl)
      .then(data => data.query.search)
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

export const getMergedSearches = (queryText) => new Promise((resolve, reject) => {
  const apiQueries = [getChineseToAll, getEnglishToAll, getSpanishToAll]
  Promise.all(apiQueries.map((apiQuery) => apiQuery(queryText)))
    .then((allQueryResults) => {
      const mergedResults = allQueryResults.concat
        .apply([], allQueryResults)
      resolve(mergedResults)
    })
    .catch(err => reject(err))
})

export const getAllPossibleResults = (queryText) => new Promise((resolve, reject) => {
  const apiQueries = [getChineseToAll, getEnglishToAll, getSpanishToAll]
  Promise.all(apiQueries.map((apiQuery) => apiQuery(queryText)))
    .then((allQueryResults) => {
      const mergedResults = allQueryResults.concat
        .apply([], allQueryResults)
      resolve(mergedResults)
    })
    .catch(err => reject(err))
})

// Get multiple translated page names
export const getChineseToAll = (query) => getMultipleResults([getChineseToEnglish, getChineseToSpanish], query)
export const getEnglishToAll = (query) => getMultipleResults([getEnglishToChinese, getEnglishToSpanish], query)
export const getSpanishToAll = (query) => getMultipleResults([getSpanishToChinese, getSpanishToEnglish], query)

export const getMultipleResults = (promiseList, query) => {
  return Promise.all(promiseList.map(p => p(query))).then(responses => {
    let results = []
    responses.forEach(r => results = [...results, ...r])
    return results
  })
}

// Get translated page names
export const getChineseToEnglish = (query) => getSpecificLangLink(query, lang.CHINESE, lang.ENGLISH)
export const getEnglishToChinese = (query) => getSpecificLangLink(query, lang.ENGLISH, lang.CHINESE)

export const getChineseToSpanish = (query) => getSpecificLangLink(query, lang.CHINESE, lang.SPANISH)
export const getSpanishToChinese = (query) => getSpecificLangLink(query, lang.SPANISH, lang.CHINESE)

export const getEnglishToSpanish = (query) => getSpecificLangLink(query, lang.ENGLISH, lang.SPANISH)
export const getSpanishToEnglish = (query) => getSpecificLangLink(query, lang.SPANISH, lang.ENGLISH)

const getSpecificLangLink = (queryText, inputLang, outputLang) => {
  const params = {
    action: 'query',
    format: 'json',
    origin: '*',
    lllang: outputLang,
    lllimit: 100,
    prop: 'langlinks',
    llprop: 'langname',
    titles: queryText
  }

  const requestUrl = getFullUrl(params, inputLang)
  return apiGET(requestUrl)
    .then(res =>
      Object.values(res.query.pages)
        .filter(p => p && p.langlinks)
        .flatMap(p => p.langlinks)
    )
}

export default searchPages
