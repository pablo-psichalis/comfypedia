import { apiQuery } from '../utils/api-utils'
import lang from '../utils/lang-codes'

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

export const getSpecificLangLink = (queryText, inputLang, outputLang) => {
  const params = {
    lllang: outputLang,
    lllimit: 100,
    prop: 'langlinks',
    llprop: 'langname',
    titles: queryText
  }

  return apiQuery(params, inputLang)
    .then(res =>
      Object.values(res.query.pages)
        .filter(p => p && p.langlinks)
        .flatMap(p => p.langlinks)
    )
}

export default apiLangLinks