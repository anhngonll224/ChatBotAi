import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  listSystemKey: [],
  listSystemCate: [],
  listCount: {},
  listTabs: [],
  isAuthenticated: false,
  IsResident: false,
  userInfo: {},
}

export const appGlobalSlice = createSlice({
  name: "appGlobal",
  initialState,
  reducers: {
    getListSystemCate: (state, action) => {
      state.listSystemCate = action.payload
    },
    getListSystemKey: (state, action) => {
      state.listSystemKey = action.payload
    },
    setListTabs: (state, action) => {
      state.listTabs = action.payload
    },
    changeAuthorization: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setListCount: (state, action) => {
      state.listCount = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    setIsResident: (state, action) => {
      state.IsResident = action.payload
    },
  },
})

export const {
  getListSystemCate,
  getListSystemKey,
  changeAuthorization,
  setListTabs,
  setListCount,
  setUserInfo,
  setIsResident,
} = appGlobalSlice.actions

export default appGlobalSlice.reducer
