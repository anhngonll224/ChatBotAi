import { Checkbox, Col, Form, Input, Row } from "antd"
import { useContext, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import logo from "src/assets/images/login/logo.png"
import pana from "src/assets/images/login/pana.png"
import Button from "src/components/MyButton/Button"
import STORAGE, { getStorage, setStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import {
  getListSystemCate,
  getListSystemKey,
  setIsResident,
  setListTabs,
  setUserInfo,
} from "src/redux/appGlobal"
import ROUTER from "src/router"
import AuthService from "src/services/AuthService"
import { StyleLoginPage } from "./styled"
import { jwtDecode } from "jwt-decode";
import SvgIcon from "src/components/SvgIcon"
import ModalForgePass from "./components/ModalForgePass"
import ModalConFirmationCode from "./components/ModalConFirmationCode"
const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [openForgetPassModal, setOpenForgetPassModal] = useState(false)
  const [modalConFirmationCode, setModalConFirmationCode] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { routerStore } = useContext(StoreContext)
  const [routerBeforeLogin, setRouterBeforeLogin] = routerStore

  const onLogin = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()

      const res = await AuthService.login({ ...values })
      const decoded = jwtDecode(res?.data?.user?.accesstoken);
      // Lấy thời gian hết hạn từ trường exp
      const expirationTime = decoded.exp * 1000;

      if (res?.isError) return
      setStorage(STORAGE.EXP_TIME, expirationTime)
      setStorage(STORAGE.REMEMBER_LOGIN, values?.remember)
      setStorage(STORAGE.TOKEN, res?.data?.user?.accesstoken)
      setStorage(STORAGE.USER_INFO, res?.data?.user)
      dispatch(setUserInfo(res?.data))
      setRouterBeforeLogin(undefined)
      navigate(routerBeforeLogin ? routerBeforeLogin : ROUTER.QUAN_LY_AI)
      // getListTab()
      // getSystemKey()
      // getSystemCate()
    } finally {
      setLoading(false)
    }
  }

  const handleRecoverPassword = async () => {
    setOpenForgetPassModal(false);
    setModalConFirmationCode(true);
  };

  return (
    <StyleLoginPage>
      <div className="content-wrap">
        <Row className="login-form" gutter={16}>
          <Col span={14} className="border-right-form">
            <div className="d-flex flex-column align-items-center justify-content-center">
              {/* <img src={logo} alt="" width={90} /> */}
              <SvgIcon name="logo-vncert" />
              <div className="fs-26 fw-600 title-form mt-16">
                ChatBot Ai
              </div>
              <img src={pana} alt="" width={"60%"} />
            </div>
          </Col>
          <Col span={10}>
            <div className="d-flex flex-column justify-content-center h-100">
              <div className="text-center mb-30">
                <div className="fs-28 fw-600 title-form">Đăng nhập</div>
              </div>
              <div className="pl-20 pr-20">
                <Form form={form} layout="vertical">
                  <Form.Item
                    label="Tài khoản"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống!",
                      },
                    ]}
                    name="username"
                  >
                    <Input placeholder="Nhập tài khoản" />
                  </Form.Item>
                  <Form.Item
                    label="Mật khẩu"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập mật khẩu!",
                      },
                      // {
                      //   pattern: getRegexPassword(),
                      //   message:
                      //     "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                      // },
                    ]}
                    name="password"
                  >
                    <Input.Password placeholder="Nhập mật khẩu" />
                  </Form.Item>

                  <div className="d-flex">
                    <Col span={12}>
                      <Form.Item name="remember" valuePropName="checked">
                        <Checkbox
                          onChange={val =>
                            localStorage.setItem(
                              STORAGE.REMEMBER_LOGIN,
                              JSON.stringify(val.target.checked),
                            )
                          }
                          value={getStorage(STORAGE.REMEMBER_LOGIN)}
                        >
                          Duy trì đăng nhập
                        </Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="remember" valuePropName="checked">
                        <span className="forget-pass" onClick={() => setOpenForgetPassModal(true)} ><i>Quên mật khẩu?</i> </span>
                      </Form.Item>
                    </Col>
                  </div>
                  <Row>
                    <Button
                      loading={loading}
                      btnType="primary"
                      className="btn-login"
                      type="submit"
                      htmlType="submit"
                      onClick={() => {
                        onLogin();
                      }}
                    >
                      Đăng nhập
                    </Button>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {openForgetPassModal && (
        <ModalForgePass
          open={openForgetPassModal}
          handleRecoverPassword={handleRecoverPassword}
          onCancel={() => setOpenForgetPassModal(false)}
          onOk={() => {
            setOpenForgetPassModal(false)
            // getInfo()
          }}
        />
      )}
      {modalConFirmationCode && (
        <ModalConFirmationCode
          open={modalConFirmationCode}
          // userInfo={userDetail}
          onCancel={() => setModalConFirmationCode(false)}
          onOk={() => {
            setModalConFirmationCode(false)
            // getInfo()
          }}
        />
      )}

    </StyleLoginPage>
  )
}

export default LoginPage
