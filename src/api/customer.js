import axios from '@/libs/api.request.js'

export const getCustomerList = (params) => {
  return axios.request({
    url: '/user/page',
    method: 'get',
    params: params
  })
}

// 获取详情
export function getCustomerDetail(id) {
  return axios.request({
    url: `/user/${id}/auditDetails`,
    method: 'get'
  })
}
