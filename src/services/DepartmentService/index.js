import {
  apiGetAllDept,
} from "./urls"
import http from "../index"
import QueryString from "qs"


const getAllDept = params => http.get(apiGetAllDept, { params })

const DepartmentService = {
  getAllDept,
}
export default DepartmentService
