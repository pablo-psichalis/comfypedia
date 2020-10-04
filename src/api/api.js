import { getFullUrl, apiGET } from '../utils/api-utils'

export const searchPages = (query) => {
  const params = {
    action: 'query',
    list: 'search',
    srsearch: query,
    format: 'json',
    origin: '*',
  }
  const requestUrl = getFullUrl(params)
  return apiGET(requestUrl)
}

export default searchPages
