import { Space } from 'antd';
import React from 'react';
import { FloatActionWrapper } from 'src/components/FloatAction/styles';
import ButtonCircle from 'src/components/MyButton/ButtonCircle';
import Notice from 'src/components/Notice';

export const data = [
    {
        key: '1',
        file: "123yeo.com",
        size: "12",
    },
    {
        key: '1',
        file: "doc.com.vv",
        size: "8",
    },

];

export const columns = (DeleteUserAi, GetUsersTable) => [
    // {
    //     title: "Avata",
    //     dataIndex: "avatar_url",
    //     key: "avatar_url",
    //     width: 100,
    //     align: 'center', 
    // },
    {
        title: "Tên người dùng",
        dataIndex: "fullname",
        key: "fullname",
        width: 150,
        align: 'center', // Căn giữa tiêu đề cột
    },
    {
        title: "Tên tài khoản",
        dataIndex: "username",
        width: 150,
        key: "username",
        align: 'center', // Căn giữa tiêu đề cột
    },
    {
        title: "Ngày sinh",
        dataIndex: "dateofbirth",
        key: "dateofbirth",
        width: 100,
        align: 'center', // Căn giữa tiêu đề cột
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        align: 'center', // Căn giữa tiêu đề cột
    },
    {
        title: "Số điện thoại",
        dataIndex: "phone_number",
        key: "phone_number",
        width: 120,
        align: 'center', // Căn giữa tiêu đề cột
    },
    {
        title: "Giới tính",
        dataIndex: "sex",
        key: "sex",
        width: 80,
        align: 'center', // Căn giữa tiêu đề cột
    },
    {
        title: "Trạng thái",
        dataIndex: "account_status",
        key: "account_status",
        width: 150,
        align: 'center',
        render: (val, record) => (
            <div>
                <b style={{ color: 'green' }}>
                    Đang hoạt động
                </b>

                <FloatActionWrapper size="small" className="float-action__wrapper">
                    <Space>
                        {/* <ButtonCircle
                            title="Chỉnh sửa"
                            iconName="editTypeConfig"
                            // onClick={() => handleSubmit({
                            //     isEdit: true,
                            //     record
                            // })}
                        /> */}
                        <ButtonCircle
                            title="Xóa"
                            iconName="delete-outline"
                            onClick={async () => {
                                try {
                                    await DeleteUserAi(record);
                                    await GetUsersTable();
                                    Notice({ msg: "Xóa người dùng thành công", isSuccess: true });
                                } catch (error) {
                                    // Xử lý lỗi nếu cần
                                    console.error({ msg: "Lỗi khi xóa người dùng hoặc lấy dữ liệu người dùng", isSuccess: false });
                                }
                            }}
                        />
                        {/* <ButtonCircle
                            title="Cập nhật"
                            iconName="refresh-icon"
                            onClick={() => {
                                setIsModalUpdateUser(true)
                            }}
                        /> */}
                    </Space>
                </FloatActionWrapper>
            </div>
        ),
    },
];





