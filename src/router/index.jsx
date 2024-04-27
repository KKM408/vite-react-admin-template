import React from "react";
import { Navigate } from "react-router-dom";
import withRouter from "../components/withRouter";

export const mainRoutes = [
  {
    path: "/home",
    element: React.lazy(() => import("../pages/HomePage")),
    meta: {
      key: "Home",
    },
  },
];

const notFoundPage = [
  {
    path: "/404",
    element: React.lazy(() => import("../pages/HomePage")),
  },
  {
    path: "/*",
    element: React.lazy(() => import("../pages/HomePage")),
  },
];

const routes = [
  {
    path: "/user",
    element: React.lazy(() => import("../pages/UserPage")),
    meta: {
      key: "UserPage",
    },
  },
  {
    path: "/",
    element: React.lazy(() => import("../layout/index")),
    children: [
      {
        path: "/",
        render: () => <Navigate to="/home" />,
      },
      ...mainRoutes,
      ...notFoundPage,
    ],
  },
];

const generateRouter = (routes) => {
  return routes.map((item) => {
    if (item.children) {
      item.children = generateRouter(item.children);
    }
    const PageRoute = item.render ?? withRouter(item.element, routes);
    return { ...item, element: <PageRoute /> };
  });
};

const routers = generateRouter(routes);
export { routes, routers };
