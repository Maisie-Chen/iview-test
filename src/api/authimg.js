import { getToken } from '@/libs/util'

const baseURL = 'http://47.112.238.28:9700'

export const getImg = (url) => {
  return fetch(baseURL + url, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }).then((response) => response.blob())
}
