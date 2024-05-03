import http from "../index"
import {
  apiGetListNotify,
  apiGetNewNotification,
  apiMarkAsRead,
  apiMarkAsSeen,
  apiDeleteNotifyForUser,
} from "./urls"
import QueryString from "qs"

const GetListNotify = params => http.get(apiGetListNotify, { params })

const GetNewNotification = () => http.get(apiGetNewNotification)

const MarkAsRead = params => http.patch(apiMarkAsRead + params)

const MarkAsSeen = params => http.patch(apiMarkAsSeen + params)
const DeleteNotifyForUser = params =>
  http.patch(apiDeleteNotifyForUser + params)


const NotifyService = {
  GetListNotify,
  GetNewNotification,
  MarkAsRead,
  MarkAsSeen,
  DeleteNotifyForUser,
}
export default NotifyService
