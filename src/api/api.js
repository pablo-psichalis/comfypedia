import { getFullUrl, apiGET } from '../utils/api-utils'
import lang from './lang-codes'

export const searchPages = (query) => {
  const params = {
    action: 'query',
    list: 'search',
    format: 'json',
    origin: '*',
    srsearch: query
  }
  const requestUrl = getFullUrl(params)
  return apiGET(requestUrl)
}

export const getChineseToEnglish = (query) => getTranslatedNames(query, lang.CHINESE, lang.ENGLISH)
export const getEnglishToChinese = (query) => getTranslatedNames(query, lang.ENGLISH, lang.CHINESE)
export const getChineseToSpanish = (query) => getTranslatedNames(query, lang.CHINESE, lang.SPANISH)
export const getSpanishToChinese = (query) => getTranslatedNames(query, lang.SPANISH, lang.CHINESE)

const getTranslatedNames = (queryText, inputLang, outputLang) => {
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
}

export default searchPages
