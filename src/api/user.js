import axios from '@/libs/api.request';

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password,
  };
  return axios.request({
    url: 'login',
    data,
    method: 'post',
  });
};

export const getUserInfo = token => axios.request({
  url: 'get_info',
  params: {
    token,
  },
  method: 'get',
});

export const logout = token => axios.request({
  url: 'logout',
  method: 'post',
});

export const getUnreadCount = () => axios.request({
  url: 'message/count',
  method: 'get',
});

export const getMessage = () => axios.request({
  url: 'message/init',
  method: 'get',
});

export const getContentByMsgId = msg_id => axios.request({
  url: 'message/content',
  method: 'get',
  params: {
    msg_id,
  },
});

export const hasRead = msg_id => axios.request({
  url: 'message/has_read',
  method: 'post',
  data: {
    msg_id,
  },
});

export const removeReaded = msg_id => axios.request({
  url: 'message/remove_readed',
  method: 'post',
  data: {
    msg_id,
  },
});

export const restoreTrash = msg_id => axios.request({
  url: 'message/restore',
  method: 'post',
  data: {
    msg_id,
  },
});
