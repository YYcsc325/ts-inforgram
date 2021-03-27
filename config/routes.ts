const routes = [
  { path: "/login", component: "@/pages/login" },
  { path: "/home", component: "@/pages/home" },
  { path: "/demo", component: "@/pages/demo" },
  {
    path: "/",
    exact: false,
    component: "@/layouts",
    routes: [
      { exact: true, path: "/", redirect: "/home", component: "@/pages/login" },
      { exact: true, path: "/library", component: "@/pages/library" },
      { exact: true, path: "/crowd", component: "@/pages/crowd" },
    ],
  },
  { path: "*", component: "@/pages/404" },
];

export default routes;
