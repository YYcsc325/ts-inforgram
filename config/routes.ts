const routes = [
  { path: "/login", component: "@/pages/login" },
  { path: "/home", component: "@/pages/home" },
  { path: "/edit", component: "@/pages/edit" },
  { path: "/demo", component: "@/pages/demo" },
  { path: "/demoContent", component: "@/pages/demoContent" },
  {
    path: "/",
    exact: false,
    component: "@/layouts",
    routes: [
      { exact: true, path: "/", redirect: "/home", component: "@/pages/login" },
      { exact: true, path: "/library", component: "@/pages/library" },
      { exact: true, path: "/brandsets", component: "@/pages/brandsets" },
      { exact: true, path: "/analytics", component: "@/pages/analytics" },
      { exact: true, path: "/teams", component: "@/pages/team" },
      { exact: true, path: "/content", component: "@/pages/content" },
    ],
  },
  { path: "*", component: "@/pages/404" },
];

export default routes;
