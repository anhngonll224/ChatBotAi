import { configureStore } from "@reduxjs/toolkit"
import appGlobalReducer from "./appGlobal"
import commonReducer from "./common"
import roleReducer from "./role"

export default configureStore({
  reducer: {
    appGlobal: appGlobalReducer,
    role: roleReducer,
    common: commonReducer,
  },
})
