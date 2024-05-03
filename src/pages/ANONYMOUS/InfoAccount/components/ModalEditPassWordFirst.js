import { Col, Form, Input, Modal, Row, Select, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from 'src/components/Modal/CustomModal';
import Button from 'src/components/MyButton/Button';
import SpinCustom from 'src/components/Spin';
import { getRegexPassword } from "src/lib/stringsUtils"
import { StyleModalEditPassWordFirst } from './styled';
import UserService from 'src/services/UserService';
import Notice from 'src/components/Notice';

const ModalEditPassWordFirst = ({ onOk, open, onCancel }) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [listProvince, setListProvince] = useState()
    const [listDistrict, setListDistrict] = useState()
    const [listWard, setListWard] = useState()
    const [loading, setLoading] = useState(false)
    const { listSystemKey } = useSelector(state => state.appGlobal)
    console.log('check user', open)
    const handleSubmit = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            const res = await UserService.replacePassword({
                ...values,
                id: open?.id
            })
            if (res.isError) return
            Notice({
                isSuccess: true,
                msg: "Cập nhật mật khẩu thành công!",
            })
        } finally {
            setLoading(false)
        }
    }
    const renderFooter = () => (
        <div className="d-flex justify-content-flex-end pb-15">
            <Button btnType="primary" className="btn-hover-shadow" onClick={handleSubmit}>
                Cập nhật
            </Button>
        </div>
    )
    return (
        <StyleModalEditPassWordFirst>
            <CustomModal
                title={"Đổi mật khẩu"}
                footer={renderFooter()}
                width={524}
                open={open}
                onCancel={onCancel}
            >
                <SpinCustom spinning={loading}>
                    <Form form={form} layout="vertical">
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn chưa nhập mật khẩu cũ!",
                                },
                                {
                                    pattern: getRegexPassword(),
                                    message:
                                        "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                                },
                            ]}
                            label="Mật khẩu hiện tại"
                            name="Password"
                        >
                            <Input.Password placeholder="Nhập" />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn chưa nhập mật khẩu mới!",
                                },
                                {
                                    pattern: getRegexPassword(),
                                    message:
                                        "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                                },
                            ]}
                            label="Mật khẩu mới"
                            name="NewPassword"
                        >
                            <Input.Password placeholder="Nhập" />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn chưa nhập lại mật khẩu mới!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("NewPassword") === value
                                        ) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "Mật khẩu nhập lại phải giống với mật khẩu mới!",
                                            ),
                                        )
                                    },
                                }),
                            ]}
                            label="Nhập lại mật khẩu "
                            name="ReNewPassword"
                        >
                            <Input.Password placeholder="Nhập" />
                        </Form.Item>
                        <div className="note">Mật khẩu cần tuân thủ các quy tắc:</div>
                        <div className="note">Có ít nhất 8 ký tự.</div>
                        <div className="note">
                            Có chứa từ 03 trong 04 loại ký tự sau: Chữ hoa (A, B, C, …);
                            Chữ thường (a, b, c, …); Ký tự đặc biệt (!, @, #, …); Số
                            (0,1,...9).
                        </div>
                        <div className="note mb-20">Không chứa khoảng trống</div>
                    </Form>
                </SpinCustom>
            </CustomModal>
        </StyleModalEditPassWordFirst>

    );
}

export default ModalEditPassWordFirst;
