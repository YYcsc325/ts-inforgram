const routes = [
  { path: "/home", component: "@/pages/home" },
  { path: "/login", component: "@/pages/login" },
  {
    path: "/",
    exact: false,
    component: "@/layouts",
    /** indexRoute 这里直接location.href也会重定向 */
    indexRoute: {
      redirect: "home",
    },
    routes: [
      { exact: true, path: "/", redirect: "/home", component: "@/pages/login" },
      {
        exact: true,
        path: "/library",
        component: "@/pages/exhibition/library",
      },
      {
        exact: true,
        path: "/brandsets",
        component: "@/pages/exhibition/brandsets",
      },
      {
        exact: true,
        path: "/analytics",
        component: "@/pages/exhibition/analytics",
      },
      { exact: true, path: "/teams", component: "@/pages/exhibition/team" },
      {
        exact: true,
        path: "/content",
        component: "@/pages/exhibition/content",
      },
      { path: "/edit/:id?", component: "@/pages/editor" },
      {
        exact: true,
        path: "/templates/:position?",
        component: "@/pages/templates",
      },
    ],
  },
  { path: "*", component: "@/pages/404" },
];
// 二级路由配置方式
// {
//   path: 'adraccount',
//   routes: [
//     { path: '/adraccount', redirect: 'info/list' },
//     {
//       path: 'info/list',
//       component: 'adAccount/Master/index',
//     },
//     {
//       path: 'intelligence/update',
//       component: 'adAccount/Intelligence/index',
//     },
//   ],
// },

export default routes;
