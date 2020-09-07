import axios from '@/libs/api.request.js'

export const getHouseList = (params) => {
  return axios.request({
    url: '/house/webList',
    method: 'get',
    params: params
  })
}

// 获取详情
export function getHouseDetail(id) {
  return axios.request({
    url: `/house/${id}`,
    method: 'get'
  })
}
