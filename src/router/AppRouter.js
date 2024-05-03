// import { Spin } from "antd"
import React from "react"
import { useRoutes } from "react-router-dom"
import ROUTER from "./index"
import { BallTriangle } from "react-loader-spinner"
import Install from "src/pages/ADMIN/Install"
import ChatHistory from "src/pages/ADMIN/ChatHistory"
import UpdateIDE from "src/pages/ADMIN/UpdateIDE"
// import UserManagement from "src/pages/ADMIN/UserManagement"
// import AiManager from "src/pages/ADMIN/AiManager"


// ANONYMOUS

const PublicRouters = React.lazy(() => import("src/pages/PublicRouters"))
const SvgViewer = React.lazy(() => import("src/pages/SvgViewer"))
const NotFound = React.lazy(() => import("src/pages/NotFound"))
const Home = React.lazy(() => import("src/pages/ANONYMOUS/Home"))
const LoginPage = React.lazy(() => import("src/pages/ANONYMOUS/LoginPage"))
const RegisterPage = React.lazy(() => import("src/pages/ANONYMOUS/Register"))
const InfoAccount = React.lazy(() => import("src/pages/ANONYMOUS/InfoAccount"))

// USER
const PrivateRoutes = React.lazy(() => import("src/pages/PrivateRoutes"))
const ChangePassword = React.lazy(() => import("src/pages/USER/ChangePassword"))

// ADMIN
const ListFile = React.lazy(() => import("src/pages/ADMIN/ListFile"))
const AminRoutes = React.lazy(() => import("src/pages/ADMIN/AminRoutes"))
const UserManagement = React.lazy(() => import("src/pages/ADMIN/UserManagement"))
const AiManager = React.lazy(() => import("src/pages/ADMIN/AiManager"))


function LazyLoadingComponent({ children }) {
  return (
    <React.Suspense
      fallback={
        <div className="loading-center" style={{ height: "100vh" }}>
          {/* <Spin /> */}
          <BallTriangle
            height={50}
            width={50}
            radius={5}
            color="#01638d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      }
    >
      {children}
    </React.Suspense>
  )
}

const routes = [
  {
    path: ROUTER.SVG_VIEWER,
    element: (
      <LazyLoadingComponent>
        <SvgViewer />
      </LazyLoadingComponent>
    ),
  },
  // ADMIN
  {
    element: (
      <LazyLoadingComponent>
        <AminRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: ROUTER.QUAN_LY_TAI_LIEU,
        element: (
          <LazyLoadingComponent>
            <ListFile />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.QUAN_LY_NGUOI_DUNG,
        element: (
          <LazyLoadingComponent>
            <UserManagement />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.QUAN_LY_AI,
        element: (
          <LazyLoadingComponent>
            <AiManager />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.CAI_DAT,
        element: (
          <LazyLoadingComponent>
            <Install />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.CAP_NHAT_IDE,
        element: (
          <LazyLoadingComponent>
            <UpdateIDE />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.LICH_SU_CHAT,
        element: (
          <LazyLoadingComponent>
            <ChatHistory />
          </LazyLoadingComponent>
        ),
      },
    ]
  },
  //  USER
  {
    element: (
      <LazyLoadingComponent>
        <PrivateRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: ROUTER.DOI_MAT_KHAU,
        element: (
          <LazyLoadingComponent>
            <ChangePassword />
          </LazyLoadingComponent>
        ),
      },
    ],
  },

  //  ANONYMOUS
  {
    element: (
      <LazyLoadingComponent>
        <PublicRouters />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: ROUTER.HOME,
        element: (
          <LazyLoadingComponent>
            <Home />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.DANG_NHAP,
        element: (
          <LazyLoadingComponent>
            <LoginPage />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.DANG_KY,
        element: (
          <LazyLoadingComponent>
            <RegisterPage />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.ACCOUNT,
        element: (
          <LazyLoadingComponent>
            <InfoAccount />
          </LazyLoadingComponent>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <LazyLoadingComponent>
        <NotFound />
      </LazyLoadingComponent>
    ),
  },
]
const AppRouter = () => {
  const renderRouter = useRoutes(routes)
  return renderRouter
}
export default AppRouter
