const routes = [
  { path: '/login', component: '@/pages/login' },
  { path: '/home', component: '@/pages/home' },
  { path: '/demo', component: '@/pages/demo' },
  { 
    path: '/',
    exact: false,
    component: '@/pages/layout',
    routes: [
      { exact: true, path: '/crowd', component: '@/pages/crowd' },
      { exact: true, path: '/conversion', component: '@/pages/conversion' },
    ] 
  },
  { component: '@/pages/404' }
];

export default routes;