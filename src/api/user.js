import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    username: userName,
    password
  }
  return axios.request({
    url: '/auth/account/login',
    method: 'post',
    data
  })
}

export const getUserInfo = token => axios.request({
  url: '/user/me',
  params: {
    token
  },
  method: 'get'
})

export const logout = token => axios.request({
  url: '/auth/logout',
  method: 'post'
})

