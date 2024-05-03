import {
  apiUploadFile,
  apiGetFilesByUserID,
  apiDeleteFileByFileID
} from "./urls"
import http from "../index"

const uploadFile = body => http.post(apiUploadFile, body)
const getFilesByUserID = params => http.get(apiGetFilesByUserID, { params })
const deleteFileByFileID = body => http.post(apiDeleteFileByFileID, body)



const FileService = { uploadFile, getFilesByUserID,deleteFileByFileID }
export default FileService
