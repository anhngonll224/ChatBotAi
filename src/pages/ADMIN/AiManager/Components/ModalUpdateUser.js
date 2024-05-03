import React, { useState } from 'react';
import CustomModal from 'src/components/Modal/CustomModal';
import { Col, Form, Input, Row } from 'antd';
import { useDispatch } from 'react-redux';
import Button from 'src/components/MyButton/Button';

const ModalUpdateUser = ({ open, ok, onCancel,handleSubmit }) => {
    const [pagination, setPagination] = useState({
        PageSize: 50,
        CurrentPage: 1,
    })
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
     const renderCustomFooter = () => (
        <div style={{ textAlign: 'right', marginTop: '10px', display: "flex", justifyContent: "end", width: "100%", padding: "0px 15px 0px 8px" }}>
            {/* <Button className='' style={{ marginRight: '8px', background: "#248C4E", color: "white" }}>Xem trước PDF</Button> */}
            <Button btnType="primary"  onClick={handleSubmit} >Ghi lại</Button>
            {/* onClick={handleSubmit} */}

        </div>
    );
    return (
        <div>
            <CustomModal
                title="Cập nhật Domain"
                width="1080px"
                footer={renderCustomFooter}
                open={open}
                onOk={ok}
                onCancel={onCancel}
            >
               
                    <Row gutter={[14, 24]}>
                        {/* <Col span={24}>
            <span style={{fontWeight:"bold"}}>:<span style={{fontWeight:"500"}} className='pl-5'>05</span></span>
          </Col> */}
                        <Col span={24}>
                            <Form.Item
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: "Thông tin không được để trống",
                                //     },
                                // ]}
                                label="Domain"
                                name="domain"
                            >
                                <Input placeholder='Nhập'></Input>
                            </Form.Item>
                        </Col>
                    </Row>


            </CustomModal>

        </div>
    );
}

export default ModalUpdateUser;
