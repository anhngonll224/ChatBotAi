import { Avatar, Col, Drawer, Dropdown, Layout, Menu, Row } from "antd"
import React, { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import Logo from "src/assets/images/logo/logo.png"
import STORAGE, { clearStorage, getStorage, setStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import UseWindowSize from "src/lib/useWindowSize"
import { hasPermission } from "src/lib/utils"
import ModalChangeInfo from "src/pages/USER/MyAccount/components/ModalChangeInfo"
import { setUserInfo } from "src/redux/appGlobal"
import ROUTER from "src/router"
import AuthService from "src/services/AuthService"
import LayoutCommon from "../Common/Layout"
import LayoutAdminCommon from "../Common/LayoutAdmin"
import SvgIcon from "../SvgIcon"
import { MenuItem, MenuItemAdmin } from "./MenuItems"
import Notification from "./component/Notification"
import { CustomMenuStyled, LayoutStyled, StyleMenuAccount } from "./styled"
import "./styles.scss"
import LayoutAdmin from "./component/LayoutAdmin"

const { Header, Content } = Layout

const MainLayout = ({ children, isAdmin, isUser }) => {
  // const isAdmin= true
  const { listTabs, userInfo } = useSelector(state => state?.appGlobal)
  const isLogin = getStorage(STORAGE.TOKEN)
  const isTime = getStorage(STORAGE.EXP_TIME)
  const isInfo = getStorage(STORAGE.USER_INFO)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [selectedKey, setSelectedKey] = useState(
    getStorage(STORAGE.KEY_MENU_ACTIVE) || ["/"],
  )
  const [openUserInfor, setOpenUserInfor] = useState(false)
  const { isNotificationUpdate } = useContext(StoreContext)
  const [isModelNotification, setIsModelNotification] = isNotificationUpdate
  const currentTime = Date.now();
  const [selectedKeyAdmin, setSelectedKeyAdmin] = useState()
  let isManagerPage = location.pathname.includes(ROUTER.QUAN_LY_TAI_KHOAN)
  useEffect(() => {
    let key = location?.pathname
    setSelectedKey([key])
    setSelectedKeyAdmin([key])

  }, [location])
  useEffect(() => {
    if (!!isTime && isTime < currentTime) {
      handleLogout();
    }
  }, [isTime, currentTime]);
  const onClickMenu = key => {
    if (isModelNotification) {
      setIsModelNotification(false)
    }
    setStorage(STORAGE.KEY_MENU_ACTIVE, key.keyPath)
    setSelectedKey(key.key.keyPath)
    if (!key.key.includes("subkey")) navigate(key.key)
  }
  const onClickMenuAdmin = key => {
    setSelectedKeyAdmin(key.key.keyPath)
    if (!key.key.includes("subkey")) navigate(key.key)
  }
  const handleLogout = async () => {
    try {
      if (isLogin) {

        let res = await AuthService.logout('', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer${isLogin}`, // Thêm token vào header
          }
        })
        clearStorage()
        dispatch(setUserInfo({}))
        return navigate(ROUTER?.DANG_NHAP)

      }
    } catch (error) {
      clearStorage()
      dispatch(setUserInfo({}))
      return navigate(ROUTER?.DANG_NHAP)
    }



  }

  const menuAccount = (
    <StyleMenuAccount>
      <div className="menu-account">
        <Menu className="dropdown-option">
          <div className="account-infor">
            <Menu.Item
              key="3"
              onClick={() => {
                navigate(ROUTER.ACCOUNT)
                // setOpenUserInfor(true)
              }}
            >
              <div className="btn-function strok-btn-function">
                <SvgIcon name="user-info" />
                <span className="fw-400">Thông tin tài khoản</span>
              </div>
            </Menu.Item>
            <Menu.Item
              key="4"
              onClick={() => {
                navigate(ROUTER.DOI_MAT_KHAU)
              }}
            >
              <div className="btn-function strok-btn-function">
                <SvgIcon name="reset-pass" />
                <span className="fw-400">Đổi mật khẩu</span>
              </div>
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => {
                navigate(ROUTER.QUAN_LY_AI)
              }}
            >
              <div className="btn-function strok-btn-function">
                <SvgIcon name="user-info" />
                <span className="fw-400">Quản trị hệ thống</span>
              </div>
            </Menu.Item>
            <Menu.Item
              key="5"
              style={{ color: "#ED1117" }}
              onClick={handleLogout}
            >
              <div className="btn-logout">
                <SvgIcon name="logoutIcon" />
                Đăng xuất
              </div>
            </Menu.Item>
          </div>
        </Menu>
      </div>
    </StyleMenuAccount>
  )

  const setShowListMenu = list =>
    !!list?.length
      ? list
        ?.filter(
          x => hasPermission(x?.TabID, [...listTabs]) || x.publishRouter,
        )
        .map(i => ({
          ...i,
          children: setShowListMenu(i?.children),
        }))
      : undefined

  return (
    <LayoutStyled styleBackground={isManagerPage}>
      {/* css ẩn menu đi */}
      <Header className={`header-background`} >
        <div className="d-flex-start" style={{ height: "100%" }}>
          <div className="w-100">
            {React.createElement(isAdmin ? LayoutAdminCommon : LayoutCommon, {
              children: (
                <Row
                  gutter={36}
                  className=" pt-5 pb-5 d-flex align-items-center justify-content-space-between"
                  style={{
                    margin: "auto",
                  }}
                >
                  <Col
                    className={`d-flex-center justify-content-flex-start nowrap`}
                    style={{
                      whiteSpace: "nowrap",
                      height: "40px",
                      paddingLeft: 0,
                      flex: 1,
                      width: 0,
                    }}
                    flex={"auto"}
                  >
                    <div
                      style={{ cursor: 'pointer' }}
                      className={"mr-40 ml-20"}
                      onClick={() => {
                        navigate(ROUTER.HOME)
                      }}
                    >
                      <span
                        className={`fw-600 d-flex-center h-100pe ${UseWindowSize.isMobile() ? "fs-12" : "fs-20"
                          }`}
                      >
                        <Row gutter={[5, 5]} style={{ display: 'block' }}>
                          <Col>
                            <SvgIcon name="logo-vncert" />
                          </Col>
                          {isManagerPage &&
                            <Col span={24}
                              className={`d-flex-center justify-content-flex-start nowrap`}
                              style={{
                                whiteSpace: "nowrap",
                                paddingLeft: 0,
                                flex: 1,
                                width: 0,
                              }}
                              flex={"auto"}
                            >
                              Quản lý hệ thống ChatBot
                            </Col>
                          }
                        </Row>

                      </span>
                    </div>

                  </Col>

                  <Col>
                    <CustomMenuStyled>
                      {!isManagerPage ?
                        <Menu
                          className="Menu-style align-items-center layout-action"
                          onClick={key => onClickMenu(key)}
                          selectedKeys={selectedKey}
                          mode="horizontal"
                          items={
                            isLogin
                              ? setShowListMenu(MenuItem())
                              : MenuItem().filter(i => i.publishRouter)
                          }
                        />
                        : ''
                      }
                    </CustomMenuStyled>
                  </Col>
                  <Col style={{ width: "auto" }}>
                    <Row
                      gutter={30}
                      className="align-items-center layout-action"
                    >
                      {!!isLogin ? (
                        <div className="d-flex justify-content-flex-end align-items-center">
                          {/* thông báo */}
                          <Notification />
                          {/* <span>{isInfo?.role_name}</span> */}
                          <span
                            className="mr-4 max-line1"
                            style={{
                              maxWidth: "calc(100vw - 1428px)",
                              display: "block",
                              color: 'white'
                            }}
                            title={userInfo?.fullname}
                          >
                            {userInfo?.fullname}
                          </span>
                          <Dropdown
                            overlay={menuAccount}
                            overlayStyle={{ minWidth: "200px" }}
                          >
                            <Row gutter={5} className="pointer ">
                              <Col>
                                <div className="account-infor-avatar">

                                  <Avatar
                                    src={userInfo?.avatar_url}
                                    size={38}
                                    className="style-avt mr-2"
                                    icon={
                                      // <UserOutlined
                                      //   style={{ fontSize: "24px" }}
                                      // />
                                      <div>
                                        {!!userInfo?.avatar_url ?
                                          <img style={{ width: '40px' }} className='back-ground-img' src={userInfo?.avatar_url} />
                                          :
                                          <SvgIcon name="user-circle" />
                                        }
                                      </div>
                                    }
                                  />

                                  <SvgIcon name="arrow-down-primary" />
                                </div>
                              </Col>
                            </Row>
                          </Dropdown>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center h-100 ">
                          <Row
                            onClick={() => navigate(ROUTER.DANG_NHAP)}
                            className="align-items-center pointer login-item"
                          >
                            {/* <SvgIcon
                                name="user_login"
                                className="login-icon"
                              /> */}
                            <span className="login-item_text">Đăng nhập</span>
                          </Row>
                          <Row
                            onClick={() => navigate(ROUTER.DANG_KY)}
                            className="align-items-center pointer login-item"
                          >
                            {/* <SvgIcon
                                name="register"
                                className="register-icon"
                              /> */}
                            <span className="login-item_text">Đăng ký</span>
                          </Row>
                        </div>
                      )}
                    </Row>
                  </Col>

                </Row>
              ),
            })}
          </div>
        </div>
      </Header>
      <Layout>
        <Row className="admin-style">
          {!!isAdmin ?
            <>
              <LayoutAdmin
                children={children}
                menuAdmin={MenuItemAdmin().filter(i => i.publishRouter)}
                selectedKey={selectedKeyAdmin}
              />
              {/* <Menu
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  selectedKeys={selectedKeyAdmin}
                  onClick={key => onClickMenuAdmin(key)}
                  mode="inline"
                  theme="light"
                  // inlineCollapsed={collapsed}
                  items={MenuItemAdmin().filter(i => i.publishRouter)}
                /> */}
            </>
            :
            <Content className="site-layout-background w-100">
              <div
                className="w-100"
                style={{ minHeight: "calc(100vh - 105px)" }}
              >
                <LayoutCommon>{children}</LayoutCommon>

              </div>
              {/* <Footer /> */}
            </Content>
          }

        </Row>

      </Layout>
      {!!openUserInfor && (
        <>
          <ModalChangeInfo
            open={openUserInfor}
            userInfo={userInfo}
            onCancel={() => setOpenUserInfor(false)}
            onOk={() => { }}
          />
        </>
      )}
    </LayoutStyled>
  )
}

export default MainLayout
