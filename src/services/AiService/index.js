import http from "../index"
import {
  apiUpdateDomainForAI,
  apiGetDomain,
  apiGetHistories,
  apiGetChatBotInfo,
  apiUpdateAvatarAndChatBotName,
  apiGetScriptLink,
  apiRequestTraining
} from "./urls"
import QueryString from "qs"


const PostApiUpdateDomainForAI = body => http.post(apiUpdateDomainForAI, body)
const GetDomain = body => http.get(apiGetDomain, body)
const GetHistories = body => http.get(apiGetHistories + `?${QueryString.stringify(body)}`)
const GetChatBotInfo = body => http.get(apiGetChatBotInfo, body)
const UpdateAvatarAndChatBotName = body => http.post(apiUpdateAvatarAndChatBotName, body)
const GetScriptLink = body => http.get(apiGetScriptLink, body)
const requestTraining = body => http.post(apiRequestTraining, body)




const AiService = {
  GetScriptLink,
  GetHistories,
  PostApiUpdateDomainForAI,
  GetDomain,
  GetChatBotInfo,
  UpdateAvatarAndChatBotName,
  requestTraining
}
export default AiService
