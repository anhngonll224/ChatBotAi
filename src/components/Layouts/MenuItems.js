import STORAGE, { getStorage } from "src/lib/storage"
import ROUTER from "src/router"
import SvgIcon from "../SvgIcon"
import { useEffect, useState } from "react"
import { DashboardOutlined, UserOutlined, FileOutlined, SettingOutlined, CodeOutlined, MessageOutlined } from '@ant-design/icons';


export const MenuItem = () => {
  const isLogin = getStorage(STORAGE.TOKEN)

  return [
    {
      label: "Home",
      key: ROUTER.HOME,
      publishRouter: true,
      TabID: [999],
    },
  ]
}
export const MenuItemAdmin = () => {

  const [menuItems, setMenuItems] = useState([]);
  //Lấy dữ liệu người dùng từ Storage ()
  const user = getStorage(STORAGE.USER_INFO)

  return [

    {
      label: "Quản lý AI",
      key: ROUTER.QUAN_LY_AI,
      hideOnMenu: true,
      publishRouter: true,
      icon: <DashboardOutlined />, // Perfect for AI-related management
      TabID: [1],
    },
    {
      label: "Quản lý người dùng",
      key: ROUTER.QUAN_LY_NGUOI_DUNG,
      hideOnMenu: true,
      publishRouter: true,
      icon: <UserOutlined />, // Ideal for user management
      TabID: [1],
    },
    // {
    //   label: "Danh sách tài liệu",
    //   key: ROUTER.QUAN_LY_TAI_LIEU,
    //   hideOnMenu: true,
    //   publishRouter: true,
    //   icon: <FileOutlined />, // Suitable for document lists
    //   TabID: [1],
    // },
    {
      label: "Giao diện ChatBot",
      key: ROUTER.CAI_DAT,
      hideOnMenu: true,
      publishRouter: true,
      icon: <SettingOutlined />, // Represents settings or configuration
      TabID: [1],
    },
    {
      label: "Source code Giao diện",
      key: ROUTER.CAP_NHAT_IDE,
      hideOnMenu: true,
      publishRouter: true,
      icon: <CodeOutlined />, // More specific to IDE updates (if available in Ant Design)
      TabID: [1],
    },
    {
      label: "Lịch sử chat",
      key: ROUTER.LICH_SU_CHAT,
      hideOnMenu: true,
      publishRouter: true,
      icon: <MessageOutlined />, // Clear indication of chat history
      TabID: [1],
    },
  ]
}