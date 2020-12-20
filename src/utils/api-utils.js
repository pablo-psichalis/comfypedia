import lang from './lang-codes'
import { encodeQueryData } from './url-utils'

export const getApiUrl = (langCode) => `https://${langCode}.wikipedia.org/w/api.php`
export const getFullUrl = (paramsObj, langCode = lang.ENGLISH) => `${getApiUrl(langCode)}?${encodeQueryData(paramsObj)}`

// Base config for all queries
const myHeaders = new Headers()
const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export const apiQuery = (params, lang) => {
  const baseParams = {
    action: 'query',
    format: 'json',
    origin: '*'
  }
  const requestUrl = getFullUrl({...baseParams, ...params}, lang)
  return apiGET(requestUrl)
}

const apiGET = (requestUrl) => (
  fetch(requestUrl, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))
)

export const htmlSnippetToString = (htmlSnippet) => htmlSnippet.replace(/<[^>]+>/g, '');
