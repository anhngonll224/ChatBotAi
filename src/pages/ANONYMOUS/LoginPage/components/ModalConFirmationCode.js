import { Col, Form, Input, Modal, Row, Select, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/MyButton/Button';
import SpinCustom from 'src/components/Spin';
import { StyleModalConFirmationCode } from '../styled';

const ModalConFirmationCode = ({ onOk, open, onCancel }) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const { listSystemKey } = useSelector(state => state.appGlobal)
    const renderFooter = () => (
        <div className="d-flex justify-content-flex-end pb-15">

        </div>
    )
    return (
        <Modal
            title={"Nhập mã xác nhận"}
            footer={renderFooter()}
            width={400}
            open={open}
            onCancel={onCancel}
        >
            <StyleModalConFirmationCode>
                <SpinCustom spinning={loading}>
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            // Username: userInfo.Username,
                        }}
                    >
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <span>
                                    Chúng tôi vừa gửi một tin nhắn văn bản gồm mã xác minh 6 chữ số đến
                                </span>
                                <br />
                                <span>
                                    user.com
                                </span>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: "Bạn chưa nhập nhập mã xác nhận!",
                                        },
                                    ]}
                                    label="Nhập mã"
                                    name="code"
                                >
                                    <Input placeholder="Nhập mã xác nhận" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <span style={{     cursor: "pointer", color: "rgb(36, 118, 226)", justifyContent: "center", alignItems: "center", display: "flex", margin: ' 0px 16px' }}>Gửi lại mã</span>
                                </Form.Item>
                            </Col>
                            <Button btnType="primary" className="btn-hover-shadow w-100pe" onClick={() => onCancel()}>
                                Xác nhận
                            </Button>
                            <Col span={24} style={{ cursor: "pointer"}}>
                                <div className="boxMainLogin" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span>Quay lại</span>
                                    <span className="boxLogin" style={{ paddingLeft: '5px', color: "red", fontWeight: "bold" }} >Đăng nhập</span>
                                </div>
                            </Col>


                        </Row>
                    </Form>
                </SpinCustom>
            </StyleModalConFirmationCode>
        </Modal>

    );
}

export default ModalConFirmationCode;
