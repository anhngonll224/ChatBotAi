import QueryString from "qs"
import http from "../index"
import {
  apiChangeImgUser,
  apiChangeInfor,
  apiDeletaAccountUser,
  apiDeleteUser,
  apiDetailUser,
  apiExportGuest,
  apiExportUser,
  apiChangeStatus,
  apiGetAccount,
  apiGetAllAccountUser,
  apiGetAllUserDirectory,
  apiGetInforUser,
  apiGetListGuest,
  apiGetListRecruterByUserID,
  apiGetListUser,
  apiGetListUserInDept,
  apiGetTemplateFileImportGuest,
  apiGetTemplateFileImportUser,
  apiImportGuest,
  apiImportUser,
  apiInsertAccountUser,
  apiInsertGuest,
  apiInsertRecruiter,
  apiInsertUser,
  apiReplacePassword,
  apiUpdateAccount,
  apiUpdateAccountUser,
  apiUpdateUser,

  apiGetUsers,
  apiDeleteUserAi,
  apiCreateUser
} from "./urls"

const updateAccount = body => http.post(apiUpdateAccount, body)

const getAccount = params => http.get(apiGetAccount, { params })
const insertUser = body => http.post(apiInsertUser, body)
const GetAllUserDirectory = body => http.post(apiGetAllUserDirectory, body)
const InsertGuest = body => http.post(apiInsertGuest, body)
const deleteUser = data => http.patch(apiDeleteUser, data)
const changeStatus = body =>
  http.patch(apiChangeStatus + `?${QueryString.stringify(body)}`)
const detailUser = params => http.get(apiDetailUser, { params })
const updateUser = params => http.post(apiUpdateUser, params)
const importUser = body => http.post(apiImportUser, body)
const getTemplateFileImportUser = body =>
  http.get(apiGetTemplateFileImportUser, body)
const exportUser = params => {
  http.interceptors.request.use(
    async config => {
      config.responseType = "blob"
      return config
    },
    error => Promise.reject(error),
  )
  return http.get(apiExportUser, { params })
}

const importGuest = body => http.post(apiImportGuest, body)
const exportGuest = params => http.get(apiExportGuest, { params })
const templateImportGuest = () => {
  http.interceptors.request.use(
    async config => {
      config.responseType = "blob"
      return config
    },
    error => Promise.reject(error),
  )
  return http.get(apiGetTemplateFileImportGuest)
}

const getListUser = params => http.post(apiGetListUser, params)
const GetListGuest = params => http.post(apiGetListGuest, params)
const replacePassword = body => http.post(apiReplacePassword, body)
const getInforUser = (body) => http.get(apiGetInforUser + `/${body}`)
const changeInfor = body => http.post(apiChangeInfor, body)
const changeAvatar = params =>
  http.patch(apiChangeImgUser + `?Avatar=${params}`)
const insertRecruiter = body => http.post(apiInsertRecruiter, body)
const getListRecruterByUserID = body =>
  http.post(apiGetListRecruterByUserID, body)
// lấy thông tin tất cả người dùng
const getAllAccountUser = body => http.get(apiGetAllAccountUser + `?${QueryString.stringify(body)}`)
const getListUserInDept = params => http.get(apiGetListUserInDept, { params })
const insertAccountUser = body => http.post(apiInsertAccountUser, body)
const updateAccountUser = body => http.put(apiUpdateAccountUser, body)
const deleteAccountUser = params =>
  http.patch(apiDeletaAccountUser + `?UserID=${params}`)

//QUAN LÝ AI USER
const GetUsers = body => http.get(apiGetUsers + `?${QueryString.stringify(body)}`)
const deleteUserAi = userId =>
  http.delete(`${apiDeleteUserAi}/${userId}`)

const createUser = body => http.post(apiCreateUser, body)


const UserService = {
  GetAllUserDirectory,
  InsertGuest,
  updateAccount,
  insertUser,
  getAccount,
  deleteUser,
  detailUser,
  changeStatus,
  updateUser,
  getListUser,
  importUser,
  getTemplateFileImportUser,
  exportUser,
  importGuest,
  exportGuest,
  templateImportGuest,
  GetListGuest,
  getListUserInDept,
  replacePassword,
  getInforUser,
  changeInfor,
  changeAvatar,
  insertRecruiter,
  getListRecruterByUserID,
  getAllAccountUser,
  insertAccountUser,
  updateAccountUser,
  deleteAccountUser,

  GetUsers,
  deleteUserAi,
  createUser
}
export default UserService
