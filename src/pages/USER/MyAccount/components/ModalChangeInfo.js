import { UserOutlined } from "@ant-design/icons"
import {
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  TreeSelect,
  Upload,
} from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RedStar } from "src/components/FloatingLabel/styled"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SvgIcon from "src/components/SvgIcon"
import { GUIDE_EMPTY, SYSTEM_KEY } from "src/constants/constants"
import STORAGE, { getStorage, setStorage } from "src/lib/storage"
import {
  getRegexEmail,
  getRegexMobile,
  getRegexNumber,
  regexIDCard,
} from "src/lib/stringsUtils"
import { getListComboByKey, nest, normFile } from "src/lib/utils"
import { setUserInfo } from "src/redux/appGlobal"
import DepartmentService from "src/services/DepartmentService"
import FileService from "src/services/FileService"
import PositionService from "src/services/PositionService"
import UserService from "src/services/UserService"
import styled from "styled-components"
const { Option } = Select
const ModalChangeInfoStyle = styled.div`
  .div-avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: 80%;
  }
  .wrap-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
    margin-bottom: 12px;
    position: relative;
    .camera-icon {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  .user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  .ant-upload-list {
    display: none;
  }
  .upload-avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 18px;

    .sign-button-upload {
      border-radius: 4px;
      height: 39px !important;
      padding: 2px;
      border: 1px dashed #e1e1e1;

      .sign-text-upload {
        font-weight: 600;
        font-size: 12px;
        color: #154398;
      }
      .sign-background-upload {
        background: #f7f7f7;
        border-radius: 4px;
        height: 32px !important;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 14px;
      }
      :hover {
        border: 1px solid #154398;
        background-color: #154398;
        svg {
          fill: #fff;
        }
        .sign-background-upload {
          background-color: transparent;
          border: 1px dashed transparent;
        }
        .sign-text-upload {
          color: #fff;
        }
      }
    }
  }
  .sign-text {
    font-size: 12px;
    margin-top: 16px;
    line-height: 120%;
    color: #666666;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
  }
`
const ModalChangeInfo = ({ onOk, onCancel, open }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [listDept, setListDept] = useState([])
  const [listPosition, setListPosition] = useState([])
  const [loading, setLoading] = useState(false)
  const [avatarUpload, setAvatarUpload] = useState("")
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const userStorage = getStorage(STORAGE.USER_INFO)

  const { userInfo } = useSelector(state => state?.appGlobal)
  const getListSelect = async () => {
    try {
      setLoading(true)
      const resDept = await DepartmentService.getAllDept()
      const resPostion = await PositionService.getAllPosition()

      if (!resPostion?.isError) setListPosition(resPostion?.Object)
      if (!resDept?.isError) {
        const lv1 = resDept?.Object?.find(i => i?.Level === 1)
        setListDept(
          nest(
            resDept?.Object,
            lv1?.DepartmentParentID || GUIDE_EMPTY,
            "DepartmentParentID",
          )?.[0]?.children,
        )
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListSelect()
  }, [])
  const uploadImg = async file => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("file", file)
      const res = await FileService.uploadFile(formData)
      if (res.isError) return
      setAvatarUpload(res.Object)
    } finally {
      setLoading(false)
    }
  }

  const onsubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await UserService.changeInfor({
        ...values,
        Birthday: values?.Birthday ? values?.Birthday.format() : undefined,
        Avatar: avatarUpload,
      })
      if (res?.isError) return
      getInfo()
      onOk()
      Notice({
        msg: "Cập nhật thông tin thành công!",
      })
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  const getInfo = () => {
    setLoading(true)
    UserService.getInforUser()
      .then(res => {
        if (res.isError) return

        let obj = {
          ...userStorage,
          ...res.Object,
        }
        setStorage(STORAGE.USER_INFO, obj)
        dispatch(setUserInfo(obj))

        form.setFieldsValue({
          ...obj,
          Avatar2: [{ url: obj?.Avatar }],
          Birthday: obj?.Birthday ? dayjs(obj?.Birthday) : undefined,
        })
        setAvatarUpload(pre => obj?.Avatar)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getInfo()
  }, [])

  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button btnType="primary" className="btn-hover-shadow" onClick={onsubmit}>
        Ghi lại
      </Button>
    </div>
  )
  return (
    <CustomModal
      title={"Thông tin cá nhân"}
      footer={renderFooter()}
      width={700}
      style={{ top: 12 }}
      open={open}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <ModalChangeInfoStyle>
          <Form
            form={form}
            initialValues={{
              Username: userInfo.Username,
            }}
            className="form-item-fw-600"
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div className="div-avatar">
                  <Col className="sign-img" span={24}>
                    <Form.Item
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      name="Avatar2"
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
                            <div className="wrap-avatar">
                              {!!avatarUpload || !!userInfo?.Avatar ? (
                                <img
                                  className="user-avatar"
                                  src={avatarUpload || userInfo?.Avatar}
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
                              <div className="camera-icon">
                                <SvgIcon name="camera" />
                              </div>
                            </div>
                            {/* {avatarUpload && (
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
                            )} */}
                          </div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>
                </div>
              </Col>
              <Col span={6} className="fw-600">
                Tài khoản <RedStar>*</RedStar>
              </Col>
              <Col span={18}>
                <Form.Item
                  name="Username"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập" disabled={true} />
                </Form.Item>
              </Col>
              <Col span={6} className="fw-600">
                Họ và tên<RedStar>*</RedStar>
              </Col>
              <Col span={18}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập họ và tên đệm!",
                    },
                  ]}
                  name="FullName"
                >
                  <Input placeholder="Nhập họ và tên đệm" />
                </Form.Item>
              </Col>

              <Col span={6} className="fw-600">
                Số điện thoại<RedStar>*</RedStar>
              </Col>
              <Col span={18}>
                <Form.Item
                  name="PhoneNumber"
                  label=""
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                    {
                      pattern: getRegexMobile(),
                      message:
                        "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
                    },
                  ]}
                >
                  <Input placeholder="Nhập" />
                </Form.Item>
              </Col>
              <Col span={6} className="fw-600">
                CMT/CCCD<RedStar>*</RedStar>
              </Col>
              <Col span={18}>
                <Form.Item
                  name="CitizenID"
                  label=""
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                    {
                      pattern: getRegexNumber(),
                      message: "Nhập sai định dạng!",
                    },
                    {
                      pattern: regexIDCard(),
                      message: "CCCD/CMT nhập sai định dạng!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập" />
                </Form.Item>
              </Col>
              <Col span={6} className="fw-600">
                Email <RedStar>*</RedStar>
              </Col>
              <Col span={18}>
                <Form.Item
                  name="Email"
                  label=""
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                    {
                      pattern: getRegexEmail(),
                      message: "Email sai định dạng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập" />
                </Form.Item>
              </Col>

              <Col span={6} className="fw-600">
                Ngày sinh
              </Col>
              <Col span={18}>
                <Form.Item name="Birthday" label="" required>
                  <DatePicker
                    placeholder="Chọn ngày sinh"
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </Col>
              <Col span={6} className="fw-600">
                Giới tính
              </Col>
              <Col span={18}>
                <Form.Item name="Sex" label="" required>
                  <Select placeholder="Chọn">
                    {getListComboByKey(
                      SYSTEM_KEY?.SEX_TYPE,
                      listSystemKey,
                    )?.map(i => (
                      <Select.Option key={i?.CodeValue} value={i?.CodeValue}>
                        {i?.Description}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6} className="fw-600">
                Đơn vị
              </Col>
              <Col span={18}>
                <Form.Item label="" name="DepartmentID">
                  <TreeSelect
                    style={{
                      width: "100%",
                    }}
                    showSearch
                    filterTreeNode={(inputValue, treeNode) =>
                      treeNode.title
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) > -1
                    }
                    treeDefaultExpandedKeys={listDept?.map(i => i?.value)}
                    // multiple={true}
                    // maxTagCount="responsive"
                    treeData={listDept}
                    blockNode={true}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: "auto",
                    }}
                    placeholder="Chọn đơn vị"
                  />
                </Form.Item>
              </Col>
              <Col span={6} className="fw-600">
                Chức vụ
              </Col>
              <Col span={18}>
                <Form.Item
                  name={"PositionID"}
                  label={""}
                  // required
                >
                  <Select
                    placeholder="Chọn"
                    showSearch
                    optionFilterProp="children"
                    treeNodeFilterProp="title"
                  >
                    {listPosition?.map(i => (
                      <Option
                        key={i?.PositionID}
                        value={i?.PositionID}
                        title={i?.PositionName}
                      >
                        {i?.PositionName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ModalChangeInfoStyle>
      </Spin>
    </CustomModal>
  )
}

export default ModalChangeInfo
