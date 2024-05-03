import {
  EyeInvisibleOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Col, Form, Input, Row, Upload } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LayoutCommon from "src/components/Common/Layout"
import Button from "src/components/MyButton/Button"
import SpinCustom from "src/components/Spin"
import SvgIcon from "src/components/SvgIcon"
import { ACCOUNT_TYPE_ID, SYSTEM_KEY } from "src/constants/constants"
import STORAGE, { setStorage } from "src/lib/storage"
import { formatMoney, getListComboByKey, normFile } from "src/lib/utils"
import { setUserInfo } from "src/redux/appGlobal"
import FileService from "src/services/FileService"
import UserService from "src/services/UserService"
// import ModalChangeInfo from "./components/ModalChangeInfo"
import { StyleMyAccount } from "./styled"
import moment from "moment"
import ModalEditAccount from "./ModalEditAccount"
import { EditOutlined } from '@ant-design/icons';
import ModalEditPassWordFirst from "./ModalEditPassWordFirst"
import ModalEditEnterprise from "./ModalEditEnterprise"
const MyAccount = () => {
  const dispatch = useDispatch()
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const { userInfo } = useSelector(state => state?.appGlobal)
  const isFreeTeacher = !!(
    userInfo?.AccountType === ACCOUNT_TYPE_ID.GiaoVienTuDo
  )
  const [form] = Form.useForm()
  const [userDetail, setUserDetail] = useState({})
  const [loading, setLoading] = useState(false)
  const [showChangeInfo, setShowChangeInfo] = useState(false)
  const [showChangePassWordFirst, setShowChangePassWordFirst] = useState(false)
  const [avatarUpload, setAvatarUpload] = useState("")
  const [dataUser, setDataUser] = useState("")
  // console.log('check info', userInfo?.user?.id)
  const getInfo = () => {
    setLoading(true)
    console.log('check user', userInfo)
    UserService.getInforUser(!!userInfo?.user?.id ? userInfo?.user?.id : userInfo?.id)
      .then(res => {
        if (res.isError) return
        setUserDetail(res?.data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getInfo()
  }, [])

  const uploadImg = async file => {

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("file_list", file)
      const res = await FileService.uploadFile(formData)
      if (res.isError) return
      setAvatarUpload(res.data[0])
    } finally {
      setLoading(false)
    }
  }
  const changeAvatar = () => {
    setLoading(true)
    UserService.updateAccountUser({
      avatar_url: avatarUpload?.url,
      userid: userInfo?.user.id
    })
      .then(res => {
        if (res.isError) return
        getInfo()
        setStorage(STORAGE.USER_INFO, {
          ...userInfo,
          avatar_url: avatarUpload,
        })
        dispatch(
          setUserInfo({
            ...userInfo,
            avatar_url: avatarUpload,
          }),
        )
        setAvatarUpload("")
      })
      .finally(() => setLoading(false))
  }

  // const handleHiden = () => {
  //   setHidenAccBalance(!hidenAccBalance)
  // }

  return (
    <StyleMyAccount>
      <LayoutCommon style={{ padding: "0px 30px 0px 30px" }} className="h-100vh">
        <SpinCustom spinning={loading}>
          <Form form={form} layout="vertical" style={{ width: "100%" }}>
            <Row gutter={[16, 24]}>
              <Col span={24} className="my-account-title">
                <span className="title-info mr-16">Thông tin tài khoản</span>{" "}
                <Button btnType="third" onClick={() => setShowChangeInfo(userDetail)}>
                  Chỉnh sửa
                </Button>
              </Col>
              <Col span={24} style={{ color: "#666666" }}>
                Quản lý thông tin hồ sơ để bảo mật tài khoản
              </Col>
              <Col xs={24} md={8}>
                <div className="div-avatar">
                  <div className="wrap-avatar">
                    {!!avatarUpload || !!userDetail?.avatar_url ? (
                      <img
                        className="user-avatar"
                        src={avatarUpload?.url || userDetail?.avatar_url}
                        alt="avatar"
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center user-avatar"
                        style={{ backgroundColor: "#ddd" }}
                      >
                        <UserOutlined
                          style={{ fontSize: "40px", color: "#fff" }}
                        />
                      </div>
                    )}
                  </div>
                  {/* <Col className="sign-img" span={24}> */}
                  <div className="boxAccount">
                    <Form.Item
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      name="Avatar"
                      rules={[
                        () => ({
                          validator(_, value) {
                            if (!!value?.find(i => i?.size > 5 * 1024 * 1024)) {
                              return Promise.reject(
                                new Error("Dung lượng file tối đa 5MB"),
                              )
                            }
                            return Promise.resolve()
                          },
                        }),
                      ]}
                    >
                      <Upload
                        beforeUpload={file => {
                          uploadImg(file)
                          return false
                        }}
                        accept="image/*"
                        multiple={false}
                        maxCount={1}
                        fileList={[]}
                      >
                        <div className="upload-avatar">
                          <div className="d-flex justify-content-center">
                            <Button className="sign-button-upload ">
                              <div className="sign-background-upload d-flex align-items-center">
                                <SvgIcon name="small-image-red" />
                                <div className="sign-text-upload ml-16">
                                  Chọn ảnh
                                </div>
                              </div>
                            </Button>
                            {avatarUpload && (
                              <Button
                                btnType="primary"
                                className="ml-16"
                                style={{ width: 120 }}
                                onClick={e => {
                                  e.stopPropagation()
                                  changeAvatar()
                                }}
                              >
                                Lưu ảnh
                              </Button>
                            )}
                          </div>
                        </div>
                        <div
                          className="sign-text"
                          onClick={e => {
                            e.stopPropagation()
                          }}
                        >
                          <div>Dung lượng file tối đa 5MB</div>
                          <div>Định dạng:.JPG, .JPEG, .PNG, .SVG</div>
                        </div>
                        {/* <div className="btn_avatar">
                          <Button
                            dí
                            btnType="primary"
                            className=""
                            style={{ width: 120 }}
                            onClick={e => {
                              e.stopPropagation()
                              // changeAvatar()
                            }}
                          >
                            Lưu ảnh
                          </Button>
                        </div> */}


                      </Upload>

                    </Form.Item>
                  </div>

                  {/* </Col> */}
                </div>
              </Col>




              <Col xs={12} md={8}>
                <Row gutter={[16, 24]}>
                  <Col span={8} className="field-title">
                    Tên đăng nhập:
                  </Col>
                  <Col span={16}>{userDetail?.username}</Col>
                  <Col span={8} className="field-title">
                    Họ và tên:
                  </Col>
                  <Col span={16}>{userDetail?.fullname}</Col>
                  <Col span={8} className="field-title">
                    Số điện thoại:
                  </Col>
                  <Col span={16}>{userDetail?.phone_number}</Col>

                  <Col span={8} className="field-title">
                    Email:
                  </Col>
                  <Col span={16}>{userDetail?.email}</Col>

                  <Col span={8} className="field-title">
                    Giới tính:
                  </Col>
                  <Col span={16}>
                    {userDetail?.sex}
                  </Col>

                  <Col span={8} className="field-title">
                    Ngày sinh :
                  </Col>
                  <Col span={16}>
                    {userDetail?.dateofbirth
                      ? moment(userDetail?.dateofbirth)?.format("DD/MM/YYYY")
                      : ""}
                  </Col>


                  <Col span={8} className="field-title">
                    Địa chỉ:
                  </Col>
                  <Col span={16}>{userDetail?.address}</Col>

                </Row>
              </Col>


              <Col xs={12} md={8}>
                <Row gutter={[16, 24]}>
                  <Col span={8} className="field-title">
                    Đơn vị:
                  </Col>
                  <Col span={16}>{userDetail?.work_unit}</Col>

                  <Col span={8} className="field-title">
                    Chức danh:
                  </Col>
                  <Col span={16}>{userDetail?.job_title}</Col>

                  <Col span={8} className="field-title">
                    Nhóm quyền:
                  </Col>
                  <Col span={16}>{userDetail?.role_name}</Col>

                  <Col span={8} className="field-title">
                    Mật khẩu:
                  </Col>
                  <Col span={16} className="password-info">
                    <span className="password-display">**********</span>

                    <span className="color-red pl-10 custom-pointer" onClick={() => setShowChangePassWordFirst(userDetail)} >
                      <EditOutlined />
                      <span className="pl-5">Thay đổi</span>
                    </span>
                    <br />
                    <span className="password-description">
                      Mật khẩu đang để mặc định, vui lòng thực hiện thay đổi mật khẩu.
                      Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác.
                    </span>
                  </Col>



                </Row>
              </Col>

            </Row>
          </Form>
        </SpinCustom>
        {showChangeInfo && (
          <ModalEditEnterprise
            open={showChangeInfo}
            userInfo={userDetail}
            onCancel={() => setShowChangeInfo(false)}
            onOk={() => {
              setShowChangeInfo(false)
              getInfo()
            }}
          />
        )}
        {showChangePassWordFirst && (
          <ModalEditPassWordFirst
            open={showChangePassWordFirst}
            userInfo={userDetail}
            onCancel={() => setShowChangePassWordFirst(false)}
            onOk={() => {
              setShowChangePassWordFirst(false)
              getInfo()
            }}
          />
        )}
      </LayoutCommon>
    </StyleMyAccount>
  )
}

export default MyAccount
