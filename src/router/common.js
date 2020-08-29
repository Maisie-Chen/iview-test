import Main from '@/components/main';

export default [
  {
    path: '/service_management',
    name: 'service_management',
    meta: {
      icon: 'md-image',
      title: 'serviceManege',
    },
    component: Main,
    // component: resolve => require('@/view/maisiePage/maisiePage.vue'),
    children: [
      {
        path: 'user_manage',
        name: 'user_manage',
        meta: {
          icon: 'md-grid',
          title: 'userManage',
        },
        component: resolve => require(['@/view/serv-page/user-manage.vue'], resolve),
      },
      {
        path: 'house_manage',
        name: 'house_manage',
        meta: {
          icon: 'md-grid',
          title: 'houseManage',
        },
        component: resolve => require(['@/view/serv-page/house-manage.vue'], resolve),
      },
    ],
  },
];
