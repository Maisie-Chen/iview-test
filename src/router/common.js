import Main from '@/components/main';

export default [
  {
    path: '/maisie',
    name: 'maisie_page',
    meta: {
      icon: 'md-image',
      title: 'maisie',
    },
    component: Main,
    // component: resolve => require('@/view/maisiePage/maisiePage.vue'),
    children: [
      {
        path: 'page_one',
        name: 'page_one',
        meta: {
          icon: 'md-grid',
          title: 'pageOne',
        },
        component: resolve => require(['@/view/maisiePage/maisiePage1.vue'], resolve),
      },
      {
        path: 'page_two',
        name: 'page_two',
        meta: {
          icon: 'md-grid',
          title: 'pageTwo',
        },
        component: resolve => require(['@/view/maisiePage/maisiePage2.vue'], resolve),
      },
    ],
  },
];
