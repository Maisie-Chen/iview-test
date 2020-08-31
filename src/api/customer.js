import axios from '@/libs/api.request.js'

export const getCustomerList = (params) => {
    console.log(params)
    console.log('向api发出请求')
    return axios.request({
      url: '/user/page',
      method: 'get',
      params: params
    })
  }