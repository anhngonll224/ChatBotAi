import React, { useState } from 'react';
import CustomModal from 'src/components/Modal/CustomModal';
import { StyleModalUploadFile } from '../styled';
import { Form, Spin, Upload, message } from 'antd';
import SvgIcon from 'src/components/SvgIcon';
import Notice from 'src/components/Notice';
import FileService from 'src/services/FileService';
import Button from 'src/components/MyButton/Button';

const ModalUploadFile = ({ open, ok, onCancel, getDataPdf }) => {
    const [loading, setLoading] = useState(false)
    const [dataArray, setDataArray] = useState();

    const handleUpload = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            dataArray.forEach(file => {
                formData.append('file_list', file?.originFileObj);
            });

            const res = await FileService.uploadFile(formData);
            if (res?.isOk) {
                // Xử lý thành công
                Notice({
                    msg: `${res ? "Thêm file" : ""} thành công!`,
                });
                onCancel();
                getDataPdf()
            } else {
                // Xử lý khi có lỗi từ API
                Notice({
                    msg: `${res ? "Thêm file" : ""} thất bại!`,
                });
            }
        } catch (error) {
            Notice({ msg: error.response.data.message, isSuccess: false })
        } finally {
            setLoading(false);
        }
    }
    const renderCustomFooter = () => (
        <div style={{ textAlign: 'right', marginTop: '10px', display: "flex", justifyContent: "end", width: "100%", padding: "0px 15px 0px 8px" }}>
            <Button btnType="primary" loading={loading} onClick={handleUpload} >Ghi lại</Button>

        </div>
    );
    return (
        <StyleModalUploadFile>
            <CustomModal
                title="Thêm File"
                width="1080px"
                footer={renderCustomFooter}
                open={open}
                onOk={ok}
                onCancel={onCancel}
            >
                <Form.Item
                    label="File đính kèm"
                    // name="upload"
                    style={{ width: "100%", height: "50%" }}
                    // valuePropName="fileList"
                    rules={[
                        {
                            required: true,
                            message: "File tài liệu ảnh không được để trống!",
                        }
                    ]}
                >
                    <Upload.Dragger
                        multiple={true}
                        beforeUpload={() => false}
                        onChange={info => {
                            setDataArray(info.fileList)
                        }}
                        accept=".pdf,.doc,.docx"
                        style={{ height: '50px' }}>
                        <p className="ant-upload-hint">
                            <SvgIcon name='cloud-upload' />
                            Đính kèm file <br></br>
                            Dung lượng file tối đa 20MB, nhận File pdf, doc, docx<br />
                        </p>
                    </Upload.Dragger>
                </Form.Item>

            </CustomModal>
        </StyleModalUploadFile>
    );
}

export default ModalUploadFile;
