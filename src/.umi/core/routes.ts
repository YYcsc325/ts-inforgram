// @ts-nocheck
import React from "react";
import { ApplyPluginsType } from "/Users/yycsc/Desktop/ts-inforgram/node_modules/_@umijs_runtime@3.4.2@@umijs/runtime";
import * as umiExports from "./umiExports";
import { plugin } from "./plugin";

export function getRoutes() {
  const routes = [
    {
      path: "/login",
      component: require("@/pages/login").default,
      exact: true,
    },
    {
      path: "/home",
      component: require("@/pages/home").default,
      exact: true,
    },
    {
      path: "/demo",
      component: require("@/pages/demo").default,
      exact: true,
    },
    {
      path: "/",
      exact: false,
      component: require("@/pages/layout").default,
      routes: [
        {
          exact: true,
          path: "/crowd",
          component: require("@/pages/crowd").default,
        },
        {
          exact: true,
          path: "/conversion",
          component: require("@/pages/conversion").default,
        },
      ],
    },
    {
      component: require("@/pages/404").default,
      exact: true,
    },
  ];

  // allow user to extend routes
  plugin.applyPlugins({
    key: "patchRoutes",
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
