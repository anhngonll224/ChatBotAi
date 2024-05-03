import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import STORAGE, { getStorage } from "src/lib/storage"

import ModalLoading from "./components/Modal/Loading"
import { ACCOUNT_TYPE_ID } from "./constants/constants"
import {
  getListSystemCate,
  getListSystemKey,
  setIsResident,
  setListTabs,
  setUserInfo,
} from "./redux/appGlobal"
import AppRouter from "./router/AppRouter"
import RoleService from "./services/RoleService"
import "./App.scss"

import { Spin } from "antd"

function App() {
  const isLogin = getStorage(STORAGE.TOKEN)
  const dispatch = useDispatch()
  const { modalLoading } = useSelector(state => state.common)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!!isLogin) {
      getData()
    }
  }, [isLogin])


  const getData = async () => {
    try {
      setLoading(true)
      dispatch(setUserInfo(getStorage(STORAGE.USER_INFO)))
      if (
        getStorage(STORAGE.USER_INFO)?.AccountType !== ACCOUNT_TYPE_ID.HocVien
      ) {
        const resp = await RoleService.getListTab()
        if (resp.isOk) {
          dispatch(setListTabs(resp.Object?.Data))
          dispatch(setIsResident(resp.Object?.IsResident))
        }
      }
      // getSystemKey()
      // getSystemCate()
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="layout-center">
      <div className="layout-max-width">
        {loading ? (
          <div className="loading-center" style={{ height: "100vh" }}>
            <Spin />
          </div>
        ) : (
          <AppRouter />
        )}
      </div>
      {!!modalLoading && <ModalLoading />}
    </div>
  )
}

export default App
