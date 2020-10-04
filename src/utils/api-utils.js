import lang from '../api/lang-codes'
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

export const apiGET = (requestUrl) => {
  fetch(requestUrl, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
