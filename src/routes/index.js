import { lazy } from "react";
import { Route } from "react-router-dom";
import AdminTemplate from "containers/AdminTemplate";
import HomeTemplate from "containers/HomeTemplate";

const routesHome = [
  {
    exact: true,
    path: "/",
    component: lazy(() => import("containers/HomeTemplate/HomePage"))
  },
  {
    exact: true,
    path: "/search",
    component: lazy(() => import("containers/HomeTemplate/SearchingPage"))
  },
  {
    exact: true,
    path: "/sub-jobs/:subId",
    component: lazy(() => import("containers/HomeTemplate/SubJobsPage"))
  },
  {
    exact: true,
    path: "/job-detail/:jobId",
    component: lazy(() => import("containers/HomeTemplate/JobDetailsPage"))
  },
  {
    exact: true,
    path: "/info/:id",
    component: lazy(() => import("containers/HomeTemplate/InfoPage"))
  },
  {
    exact: true,
    path: "/user-page",
    component: lazy(() => import("containers/HomeTemplate/UserPage"))
  },
  {
    exact: true,
    path: "/shop-art",
    component: lazy(() => import("containers/HomeTemplate/ShopArtPage"))
  },
];

const routesUser = [
  {
    exact: true,
    path: "/login",
    component: lazy(() => import("containers/AdminTemplate/LoginPage"))
  },
  {
    exact: true,
    path: "/signup",
    component: lazy(() => import("containers/AdminTemplate/SignUpPage"))
  },
];

const routesAdmin = [
  {
    exact: true,
    path: "/users-management",
    component: lazy(() => import("containers/AdminTemplate/UsersManagementPage"))
  },
  {
    exact: true,
    path: "/services-management",
    component: lazy(() => import("containers/AdminTemplate/ServicesManagementPage"))
  },
  {
    exact: true,
    path: "/catalog-management",
    component: lazy(() => import("containers/AdminTemplate/CatalogManagementPage"))
  },
];

const renderRoutesHome = () => {
  return routesHome.map((route, index) => {
    return <HomeTemplate
      key={index}
      exact={route.exact}
      path={route.path}
      component={route.component}
    />
  })
};
const renderRoutesUser = () => {
  return routesUser.map((route, index) => {
    return <Route
      key={index}
      exact={route.exact}
      path={route.path}
      component={route.component}
    />
  })
};
const renderRoutesAdmin = () => {
  return routesAdmin.map((route, index) => {
    return <AdminTemplate
      key={index}
      exact={route.exact}
      path={route.path}
      component={route.component}
    />
  })
};

export { renderRoutesHome, renderRoutesUser, renderRoutesAdmin }