import axios from "axios"
import http from "../index"
import {
  apiChangePassword,
  apiForgotPassword,
  apiLogin,
  apiLogout,
  apiRegister,
  apiRegisterAccount,
  apiVerifyCode,
} from "./urls"
import QueryString from "qs"

const login = body => http.post(apiLogin, body)
const register = body => http.post(apiRegister, body)
const registerAccount = body => http.post(apiRegisterAccount, body)
const forgotPass = body => http.post(apiForgotPassword, body)
const verifyCode = body => http.post(apiVerifyCode, body)
const changePassword = body => http.post(apiChangePassword, body)
const logout = (body) => http.post(apiLogout, body)

//Lấy thông tin mã số thuế
const getInfoByTaxCode = code =>
  axios({
    method: "get",
    url: `https://api.vietqr.io/v2/business/${code}`,
    // data: { user }
  })

const AuthService = {
  login,
  logout,
  register,
  registerAccount,
  forgotPass,
  verifyCode,
  changePassword,
  getInfoByTaxCode,
}
export default AuthService
