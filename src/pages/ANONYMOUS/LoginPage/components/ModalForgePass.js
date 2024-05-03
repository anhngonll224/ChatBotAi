import { Col, Form, Input, Modal, Row, Select, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/MyButton/Button';
import SpinCustom from 'src/components/Spin';
import styled from 'styled-components';
export const StyleModalForgePass = styled.div`
  .boxMainLogin {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .ant-form-item {
    /* Các quy tắc cho ant-form-item */
  }

  .colorRead {
    color: red;
  }
  .ant-form-item {
    margin-bottom: 0px !important;
}
`;

const ModalForgePass = ({ onOk, open, onCancel, handleRecoverPassword }) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const { listSystemKey } = useSelector(state => state.appGlobal)

    const renderFooter = () => (
        <div className="d-flex justify-content-flex-end pb-15">
            <Button
                btnType="primary"
                className="btn-hover-shadow w-100pe"
                onClick={async () => {
                    handleRecoverPassword()
                }}
            >
                Lấy lại mật khẩu
            </Button>

            <div className='d-flex'>
                <span>Quay lại</span>
                <span className='boxLogin' >Đăng nhập</span>
            </div>
        </div>

    )
    return (
        <Modal
            title={"Quên mật khẩu"}
            footer={null}
            width={400}
            open={open}
            onCancel={onCancel}
        >
            <StyleModalForgePass>

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
                                    Nhập email tài khoản bạn đăng nhập
                                </span>
                                <br />
                                <span>
                                    Chúng tôi sẽ gửi mã xác minh đến tài khoản email đăng ký cho bạn!
                                </span>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: "Bạn chưa nhập nhập lại mật khẩu!",
                                        },
                                    ]}
                                    label="Email"
                                    name="email"
                                >
                                    <Input placeholder="Nhập lại email" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Button
                                    btnType="primary"
                                    className="btn-hover-shadow w-100pe"
                                    onClick={async () => {
                                        handleRecoverPassword()
                                    }}
                                >
                                    Lấy lại mật khẩu
                                </Button>

                            </Col>
                            <Col span={24} style={{ cursor: "pointer"}}>
                                <div className="boxMainLogin " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span className=''>Quay lại</span>
                                    <span className="boxLogin" style={{ paddingLeft: '5px', color: "red", fontWeight: "bold" }} >Đăng nhập</span>
                                </div>
                            </Col>

                        </Row>
                    </Form>
                </SpinCustom>
            </StyleModalForgePass>
        </Modal>

    );
}

export default ModalForgePass;
