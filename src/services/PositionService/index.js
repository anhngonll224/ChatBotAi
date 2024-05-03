import {
  apiCreate,
  apiDelete,
  apiGetAllPosition,
  apiGetListPosition,
  apiGetAllTitle,
  apiUpdate,
  apiImportPosition,
} from "./urls"
import http from "../index"
const getAllTitle = () => http.get(apiGetAllTitle)
const getAllPosition = () => http.get(apiGetAllPosition)
const deletePos = data => http.patch(apiDelete, data)
const create = body => http.post(apiCreate, body)
const update = body => http.put(apiUpdate, body)
const getListPosition = body => http.post(apiGetListPosition, body)
const importPosition = body => http.post(apiImportPosition, body)

const PositionService = {
  getAllPosition,
  create,
  getListPosition,
  deletePos,
  update,
  getAllTitle,
  importPosition,
}
export default PositionService
