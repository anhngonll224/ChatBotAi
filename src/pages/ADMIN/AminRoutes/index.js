import { useContext, useEffect } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { Button, Result } from "antd"
import { useLocation, NavLink } from "react-router-dom"
import MainLayout from "src/components/Layouts"
import STORAGE, { getStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import ROUTER from "src/router"
import { ACCOUNT_TYPE_ADMIN, ACCOUNT_TYPE_ID } from "src/constants/constants"
import { useState } from "react"

function AdminRoutes() {
  const { isNotificationUpdate } = useContext(StoreContext)
  const [isModelNotification, setIsModelNotification] = isNotificationUpdate
  const { routerStore } = useContext(StoreContext)
  const [, setRouterBeforeLogin] = routerStore
  const isLogin = getStorage(STORAGE.TOKEN)
  const navigate = useNavigate()
  const user = getStorage(STORAGE.USER_INFO)
  const location = useLocation()
  const [check, setCheck] = useState()

  // useEffect(() => {

  //   setCheck(location?.key)
  //   if (!isLogin)
  //     setRouterBeforeLogin(`${location.pathname}${location?.search}`)
  // }, [isLogin])
  // if (window.history.state.key !== check) {
  //   setIsModelNotification(false)
  // }
  return !!isLogin ? (
    !!ACCOUNT_TYPE_ADMIN?.includes(user?.role_group_id) ? (
      <MainLayout isAdmin={true}>
        <Outlet />
      </MainLayout>

    ) : (
      <Result
        status="403"
        title="403 Erorr Permission"
        subTitle="Xin lỗi, Bạn không có quyền truy cập trang web."
        extra={
          <NavLink to="/">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type="primary" className="btn-hover-shadow">
                Quay lại trang chủ
              </Button>
            </div>
          </NavLink>
        }
      />
    )
  ) : (
    <Navigate to={ROUTER.HOME} />
  )
}

export default AdminRoutes
