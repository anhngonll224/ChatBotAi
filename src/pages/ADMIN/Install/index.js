import { Avatar, Col, ColorPicker, Form, Input, Row, Space, Spin, Table, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import Button from 'src/components/MyButton/Button';
import FileService from 'src/services/FileService';
// import ModalUploadFile from './Components/ModalUploadFile';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { formatMoney, getListComboByKey, normFile } from "src/lib/utils"
import { StyledBox } from './styled';
import AiService from 'src/services/AiService';
import SvgIcon from 'src/components/SvgIcon';
// import { HexColorPicker } from 'react-colorful';
import Notice from 'src/components/Notice';

const Install = () => {
    const [loading, setLoading] = useState();
    const [form] = Form.useForm();
    const [avatarUpload, setAvatarUpload] = useState("")
    const [userDetail, setUserDetail] = useState({})
    const [color, setColor] = useState();
    const getUserChatAi = async () => {
        try {
            setLoading(true);
            const resp = await AiService.GetChatBotInfo();
            setColor(resp?.data?.color)
            form.setFieldsValue({
                name: resp?.data?.name,
                avatar: resp?.data?.avatar,
            })
            setUserDetail(resp?.data)
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getUserChatAi()
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
    const changeAvatar = async () => {
        const values = await form.validateFields()
        setLoading(true)
        AiService.UpdateAvatarAndChatBotName({
            name: values?.name,
            avatar_url: !!avatarUpload ? avatarUpload?.url : undefined,
            color: color
        })
            .then(res => {
                setAvatarUpload("")
                getUserChatAi()
                if (res.isOk) {
                    Notice({
                        isSuccess: true,
                        msg: "Lưu thành công",
                    })
                }
            })
            .finally(() => setLoading(false))
    }

    return (
        <StyledBox>
            <Spin spinning={loading}>
                <Row gutter={[16, 16]} >
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{}}
                        style={{ width: "100%" }}
                    >
                        <Col span={24}>
                            <div className="title-type-1 d-flex justify-content-space-between pb-15 mb-20">
                                Cập nhật ChatBot
                            </div>
                        </Col>
                        <div className='boxMain'>
                            <Row className='justify-content-space-between'>

                                <Col>
                                    <span style={{ fontWeight: 'bold' }}>Cài đặt</span><br></br>
                                    <span className='text-italic'> (Tùy chỉnh giao diện ChatBot của bạn)</span>

                                </Col>
                                <Col>
                                    <Space>
                                        <Button btnType="primary"
                                            onClick={e => {
                                                changeAvatar()
                                            }}
                                        // disabled={!!avatarUpload}
                                        >
                                            Lưu
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                            <Row gutter={[50]}>
                                <Col span={12}>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Tên ChatBot"
                                                name="name"
                                            >
                                                <Input placeholder='Nhập'></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24} className='d-flex'>
                                            <div className="div-avatar d-flex">
                                                <div className="wrap-avatar mr-20">
                                                    {!!avatarUpload || !!userDetail?.avatar ? (
                                                        <img
                                                            className="user-avatar"
                                                            style={{
                                                                height: '100px',
                                                                width: '100px',
                                                                borderRadius: '50%'
                                                            }}
                                                            src={avatarUpload?.url || userDetail?.avatar}
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
                                                </div>

                                                {/* </Col> */}
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col span={12}>
                                    <Row gutter={[20]}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Màu giao diện"
                                                name="color"
                                            >
                                                {/* <HexColorPicker color={color} onChange={setColor} /> */}


                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Mã màu"

                                            >
                                                <div className='d-flex'>
                                                    <div className='mr-5' style={{ backgroundColor: color, width: '40px', height: '40px', border: '1px solid black' }}></div>
                                                    <div style={{ color: color, fontSize: '25px', fontWeight: '500' }} >{color}</div>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                            <div className='d-flex ' style={{ width: "100%" }}>

                                {/* <Col span={8} className='d-flex'>
                                <Form.Item
                                    label="Logo Công Ty"
                                    name="domain"
                                >
                                    <Avatar size={64} icon={<UploadOutlined />} className='mr-20' />
                                </Form.Item>
                                <div style={{ alignItems: "center", display: "flex" }}>
                                    <Upload>
                                        <div style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: "pointer" }}>Tải ảnh lên</div>
                                        <div style={{ fontStyle: 'italic', opacity: 0.5, transform: 'rotate(-2deg)' }}>JPG/PNG tải file 5MB</div>
                                    </Upload>
                                </div>
                            </Col> */}
                            </div>
                            {/* <Col span={24}>
                    <Form.Item
                        label="Chọn icon"
                        name="icon"
                    >
                        <IconTooltip />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Chọn màu"
                        name="color"
                    >
                        <ColorPicker />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Tiêu đề phụ"
                        name="Subtitle"
                    >
                        <Input placeholder='Nhập tiêu đề phụ muốn hiển thị' />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Tin nhắn chào mừng"
                        name="WelcomeMessage"
                    >
                        <Input placeholder='Chào bạn! Chào mừng bạn đến với ChatBot-Ai ChatBot số 1 trên thế giới, Bạn muốn tìm hiểu ...' />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Vẵn bản gợi ý nhập dữ liệu"
                        name="TextSuggestions"
                    >
                        <Input placeholder='VD:Nhập tin nhắn' />
                    </Form.Item>
                </Col> */}
                        </div>

                    </Form>
                </Row>

            </Spin>


        </StyledBox>

    );
}

export default Install;
