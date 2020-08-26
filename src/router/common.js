import Main from '@/components/main'

export default [
  {
    path: '/maisie',
    name: 'maisie_page',
    meta: {
      icon: 'md-image',
      title: 'maisie'
    },
    component: Main,
    // component: () => import('@/view/maisiePage/maisiePage.vue'),
    children: [
      {
        path: 'page_one',
        name: 'page_one',
        meta: {
          icon: 'md-grid',
          title: 'pageOne'
        },
        component: () => import('@/view/maisiePage/maisiePage1.vue')
      },
      {
        path: 'page_two',
        name: 'page_two',
        meta: {
          icon: 'md-grid',
          title: 'pageTwo'
        },
        component: () => import('@/view/maisiePage/maisiePage2.vue')
      }
    ]
  }
]
