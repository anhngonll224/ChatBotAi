import { Avatar, Col, DatePicker, Form, Input, Modal, Row, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from 'src/components/Modal/CustomModal';
import Button from 'src/components/MyButton/Button';
import SpinCustom from 'src/components/Spin';
import STORAGE from 'src/lib/storage';
import { StyleModalAccount } from './styled';
import SvgIcon from 'src/components/SvgIcon';
import { AntDesignOutlined, InboxOutlined, UserOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import FileService from 'src/services/FileService';
import { formatMoney, getListComboByKey, normFile } from "src/lib/utils"
import UserService from 'src/services/UserService';


const ModalEditEnterprise = ({ onOk, open, onCancel }) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const { listSystemKey } = useSelector(state => state.appGlobal)
    const userStorage = JSON.parse(localStorage.getItem(STORAGE.USER_INFO))
    const [avatarUpload, setAvatarUpload] = useState("")


    useEffect(() => {
        form.setFieldsValue(
            { ...open }
        )
    }, []);
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
    const changeUpdate = async () => {
        setLoading(true)
        const values = await form.validateFields()
        UserService.updateAccountUser({
            ...values,
            avatar_url: avatarUpload?.url,
            userid: open?.id
        })
            .then(res => {
                if (res.isError) return
                onOk()
            })
            .finally(() => setLoading(false))
    }
    const renderFooter = () => (
        <div className="d-flex justify-content-flex-end pb-15">
            <Button btnType="primary" className="btn-hover-shadow" onClick={changeUpdate}>
                Cập nhận
            </Button>
        </div>
    )
    return (
        <StyleModalAccount>
            <CustomModal
                title={"Sửa thông tin tài khoản"}
                footer={renderFooter()}
                width={1024}
                open={open}
                onCancel={onCancel}
            >
                <SpinCustom spinning={loading}>
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            // Username: userInfo.Username,
                        }}
                    >
                        <Row gutter={[16, 16]}>

                            <Col span={24} className='d-flex  '>
                                <Form.Item
                                    className='avatarEdit'
                                    label="Hình đại diện"
                                    name="avatar"
                                >
                                    <Avatar
                                        size={{
                                            xs: 24,
                                            sm: 32,
                                            md: 40,
                                            lg: 60,
                                            xl: 80,
                                            xxl: 85,
                                        }}
                                        src={avatarUpload?.url || open?.avatar_url}
                                    />
                                </Form.Item>


                                <Form.Item
                                    className='pl-20 pt-30'
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    // name="avatar_url"
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
                                                <Button className="sign-button-upload w-100pe pl-20">
                                                    <div className="sign-background-upload d-flex align-items-center">
                                                        <SvgIcon name="small-image-red" />
                                                        <div className="sign-text-upload ml-16">
                                                            Chọn ảnh
                                                        </div>
                                                    </div>
                                                </Button>

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
                                    </Upload>

                                </Form.Item>

                            </Col>


                            {open?.account_type === 2 ?
                                <>
                                    <Col span={24}>
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Thông tin không được để trống",
                                                },
                                            ]}
                                            label="Tên đơn vị"
                                            name="work_unit"
                                        >
                                            <Input placeholder="Nhập tên đơn vị" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Thông tin không được để trống",
                                                },
                                            ]}
                                            label="Người đại diện"
                                            name="fullname"
                                        >
                                            <Input placeholder="Nhập người đại diện" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Thông tin không được để trống",
                                                },
                                            ]}
                                            label="Chức danh người đại diện"
                                            name="fullname"
                                        >
                                            <Input placeholder="Nhập chức danh người đại diện" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Thông tin không được để trống",
                                                },
                                            ]}
                                            label="Mã số thuế"
                                            name="FullName"
                                        >
                                            <Input placeholder="Nhập mã số thuế" />
                                        </Form.Item>
                                    </Col>
                                </>
                                :
                                <Col span={24}>
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                message: "Thông tin không được để trống",
                                            },
                                        ]}
                                        label="Tên đăng nhập"
                                        name="username"

                                    >
                                        <Input disabled placeholder="Nhập tên đơn vị" />
                                    </Form.Item>
                                </Col>
                            }

                            <Col span={open?.account_type === 2 ? 8 : 12}>
                                <Form.Item
                                    name="phone_number"
                                    label="Số điện thoại"
                                    required
                                    rules={[
                                        { required: true, message: "Thông tin không được để trống" },
                                        {
                                            // pattern: getRegexMobile(),
                                            message: "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập" />
                                </Form.Item>
                            </Col>
                            {open?.account_type === 2 &&
                                <Col span={8}>
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                message: "Thông tin không được để trống",
                                            },
                                        ]}
                                        label="Fax"
                                        name="FullName"
                                    >
                                        <Input placeholder="Nhập fax" />
                                    </Form.Item>
                                </Col>
                            }
                            <Col span={open?.account_type === 2 ? 8 : 12}>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: "Thông tin không được để trống" },
                                        {
                                            // pattern: getRegexEmail(),
                                            message: "Email sai định dạng",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập" />
                                </Form.Item>
                            </Col>
                            {/* <Col span={8}>
                                <Form.Item
                                    name="ProvinceID"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Thông tin không được để trống",
                                        },
                                    ]}
                                    required
                                    label="Tỉnh/Thành phố"
                                >
                                    <Select
                                        showSearch
                                        placeholder="--Chọn--"
                                        // onChange={onChangeProvince}
                                        style={{ width: "100%" }}
                                    >
                                        
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="DistrictID"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Thông tin không được để trống",
                                        },
                                    ]}
                                    required
                                    label="Quận/Huyện"
                                >

                                    <Select
                                        showSearch
                                        placeholder="--Chọn--"
                                        // onChange={onChangeDistrict}
                                        style={{ width: "100%" }}
                                    >
                                      
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item
                                    name="WardID"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Thông tin không được để trống",
                                        },
                                    ]}
                                    required
                                    label="Xã/Phường"
                                >
                                    <Select
                                        showSearch
                                        placeholder="--Chọn--"
                                        style={{ width: "100%" }}
                                    >
                                      
                                    </Select>
                                </Form.Item>
                            </Col> */}

                            <Col span={24}>
                                <Form.Item
                                    label="Số nhà/tổ/thôn/xóm... "
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Bạn chưa nhập Số nhà/tổ/thôn/xóm...!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Số nhà/tổ/thôn/xóm... " />
                                </Form.Item>
                            </Col>
                            {open?.account_type === 2 &&
                                <Col span={24}>
                                    <Form.Item
                                        label="File đính kèm"
                                        // name="upload"
                                        style={{ width: "100%" }}
                                        // valuePropName="fileList"
                                        rules={[
                                            {
                                                required: true,
                                                message: "File tài liệu ảnh không được để trống!",
                                            }
                                        ]}
                                    >
                                        <Dragger>
                                            <p className="ant-upload-hint">
                                                <SvgIcon name='cloud-upload' />
                                                Kéo thả file đính kèm hoặc Chọn file
                                            </p>
                                        </Dragger>
                                    </Form.Item>
                                </Col>
                            }
                        </Row>
                    </Form>
                </SpinCustom>
            </CustomModal>
        </StyleModalAccount>

    );
}

export default ModalEditEnterprise;
