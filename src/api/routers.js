import axios from '@/libs/api.request'

export const getRouterReq = access => axios.request({
  url: 'get_router',
  params: {
    access
  },
  method: 'get'
})
