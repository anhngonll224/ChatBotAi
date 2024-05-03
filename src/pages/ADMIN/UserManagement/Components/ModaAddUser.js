import React, { useState } from 'react';
import CustomModal from 'src/components/Modal/CustomModal';
import { Checkbox, Col, Form, Input, Radio, Row } from 'antd';
import { useDispatch } from 'react-redux';
import UserService from 'src/services/UserService';
import Notice from 'src/components/Notice';
import Button from 'src/components/MyButton/Button';

const ModaAddUser = ({ open, ok, onCancel, GetUsersTable }) => {
  const [pagination, setPagination] = useState({
    PageSize: 50,
    CurrentPage: 1,
  })
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState();


  const onChange = (e) => {
    // console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();


      const requestBody = {
        ...values,
        // avatar_url:"không có"
      };

      const res = await UserService.createUser(requestBody);

      if (res && res.isOk && res.message) {
        Notice({ msg: res.message, isSuccess: true })
        // console.log("thanhcong",res.message) 
        GetUsersTable()
        onCancel()
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        Notice({ msg: errorMessage, isSuccess: false });
      } else {
      }
    } finally {
      setLoading(false);
    }
  };

  const renderCustomFooter = () => (
    <div style={{ textAlign: 'right', marginTop: '10px', display: "flex", justifyContent: "end", width: "100%", padding: "0px 15px 0px 8px" }}>
      <Button btnType="primary" onClick={handleCreateUser} className={loading ? 'disable' : ''} disabled={loading}>
        {loading ? 'Đang xử lý...' : 'Ghi lại'}
      </Button>

    </div>
  );
  return (
    <CustomModal
      title="Thêm người dùng"
      width="1080px"
      footer={renderCustomFooter}
      open={open}
      onOk={ok}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          // Username: userInfo.Username,
        }}
      >
        <Row gutter={[14, 24]}>
          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Thông tin không được để trống",
                },
              ]}
              label="Tên tài khoản"
              name="username"
            >
              <Input placeholder='Nhập'></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Thông tin không được để trống",
                },
              ]}
              label="Mật khẩu"
              name="password"
            >
              <Input placeholder='Nhập'></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Thông tin không được để trống",
                },
              ]}
              label="Email"
              name="email"
            >
              <Input placeholder='Nhập'></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Thông tin không được để trống",
                },
              ]}
              label="Tên người dùng"
              name="fullname"
            >
              <Input placeholder='Nhập'></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Thông tin không được để trống",
                },
              ]}
              label="Ngày sinh"
              name="dateofbirth"
            >
              <Input placeholder='Nhập'></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Thông tin không được để trống",
                },
              ]}
              label="Số điện thoại"
              name="phone_number"
            >
              <Input placeholder='Nhập'></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              // rules={[
              //   {
              //     required: true,
              //     message: "Thông tin không được để trống",
              //   },
              // ]}
              label="Giới tính"
              name="sex"
            >
              <Input placeholder='Nhập'></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              // rules={[
              //   {
              //     required: true,
              //     message: "Thông tin không được để trống",
              //   },
              // ]}
              label="Chọn nhóm quyền"
              name="role_group_id"
            >
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={"admin"}>Admin</Radio>
                <Radio value={"user"}>User</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>

    </CustomModal>
  );
}

export default ModaAddUser;
