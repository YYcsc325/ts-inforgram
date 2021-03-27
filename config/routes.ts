const routes = [
  { path: "/login", component: "@/pages/login" },
  { path: "/home", component: "@/pages/home" },
  { path: "/demo", component: "@/pages/demo" },
  { path: "/library", component: "@/pages/library" },
  {
    path: "/",
    exact: false,
    component: "@/layouts",
    redirect: "/home",
    routes: [{ exact: true, path: "/crowd", component: "@/pages/crowd" }],
  },
  { path: "*", component: "@/pages/404" },
];

export default routes;
