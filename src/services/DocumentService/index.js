import {
  apiGetDocuments,
  apiDeleteDocument,
  apiCreateDocuments,
} from "./urls"
import http from "../index"
import QueryString from "qs"

const GetDocuments = body => http.get(apiGetDocuments + `?${QueryString.stringify(body)}`)
const DeleteDocument = body => http.delete(apiDeleteDocument + `/${(body)}`)
const CreateDocuments = body => http.post(apiCreateDocuments, body)

const DocumentService = { GetDocuments, DeleteDocument, CreateDocuments }
export default DocumentService
