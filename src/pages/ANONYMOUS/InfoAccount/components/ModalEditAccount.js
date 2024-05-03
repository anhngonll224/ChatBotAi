import { Avatar, Col, DatePicker, Form, Input, Modal, Row, Select, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from 'src/components/Modal/CustomModal';
import Button from 'src/components/MyButton/Button';
import SpinCustom from 'src/components/Spin';
import STORAGE from 'src/lib/storage';
import { StyleModalAccount } from './styled';
import SvgIcon from 'src/components/SvgIcon';
import { AntDesignOutlined } from '@ant-design/icons';
const renderFooter = () => (
    <div className="d-flex justify-content-flex-end pb-15">
        <Button btnType="primary" className="btn-hover-shadow" onClick={onsubmit}>
            Cập nhật
        </Button>
    </div>
)
const ModalEditAccount = ({ onOk, open, onCancel }) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [listProvince, setListProvince] = useState()
    const [listDistrict, setListDistrict] = useState()
    const [listWard, setListWard] = useState()
    const [loading, setLoading] = useState(false)
    const { listSystemKey } = useSelector(state => state.appGlobal)
    const userStorage = JSON.parse(localStorage.getItem(STORAGE.USER_INFO))
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
                                        icon={<AntDesignOutlined />}
                                    />
                                </Form.Item>


                                <Form.Item
                                    className='pl-20'
                                    valuePropName="fileList"
                                    //   getValueFromEvent={normFile}
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
                                            // uploadImg(file)
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
                                        <div className="btn_avatar">

                                        </div>


                                    </Upload>

                                </Form.Item>

                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: "Bạn chưa nhập họ và tên đệm!",
                                        },
                                    ]}
                                    label="Tên đăng nhập"
                                    name="FullName"
                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
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
                                        {/* {listProvince?.length &&
                                        listProvince?.map(i => (
                                            <Option key={i.RegionID} value={i.RegionID}>
                                                {i.RegionName}
                                            </Option>
                                        ))} */}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: "Bạn chưa nhập họ và tên đệm!",
                                        },
                                    ]}
                                    label="Họ và tên"
                                    name="FullName"
                                >
                                    <Input placeholder="Nhập họ và tên" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
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
                                        {/* {listDistrict?.length &&
                                        listDistrict?.map(i => (
                                            <Option key={i.RegionID} value={i.RegionID}>
                                                {i.RegionName}
                                            </Option>
                                        ))} */}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="PhoneNumber"
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

                            <Col span={12}>
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
                                        {/* {listWard?.length &&
                                        listWard?.map(i => (
                                            <Option key={i.RegionID} value={i.RegionID}>
                                                {i.RegionName}
                                            </Option>
                                        ))} */}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="Email"
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

                            <Col span={12}>
                                <Form.Item
                                    label="Số nhà/tổ/thôn/xóm... "
                                    name="Address"
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


                        </Row>
                    </Form>
                </SpinCustom>
            </CustomModal>
        </StyleModalAccount>

    );
}

export default ModalEditAccount;
