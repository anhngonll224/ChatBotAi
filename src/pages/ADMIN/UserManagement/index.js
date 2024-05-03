import React, { useEffect, useState } from 'react';
import { UseManagementStyle } from './styled';
import { Col, Form, Row, Space, Tabs, message } from 'antd';
import TableCustom from 'src/components/Table/CustomTable';
import { columns, data } from './Components/tagData';
import UserService from 'src/services/UserService';
import Button from 'src/components/MyButton/Button';
import ModaAddUser from './Components/ModaAddUser';
import Notice from 'src/components/Notice';
import CB1 from 'src/components/Modal/CB1';


const UserManagement = () => {
    const [isKeyCard, setIsKeyCard] = useState(1);
    const [loading, setLoading] = useState(false)
    const [ListFile, setListFile] = useState()
    const [userDelete, setUserDelete] = useState()
    const [total, setTotal] = useState()
    const [isModalAddUser, setIsModalAddUser] = useState(false)
    const [form] = Form.useForm()
    const [pagination, setPagination] = useState({
        page_size: 10,
        page_number: 1,
    })

    const onChangeTable = (key) => {
        setIsKeyCard(key)
    };
    const GetUsersTable = async () => {
        setLoading(true)

        try {
            // const values = await form?.validateFields()
            // console.log("values", values)
            const requestBody = {
                // ...values,

            };


            const res = await UserService.GetUsers({
                ...pagination
            });

            if (res && res.isOk) {
                setListFile(res.data)
                setTotal(res.total)
                // window.open(res.data, "_blank"); 
                // setPDF(res.data)
                // Notice({ isError: true, msg: res.message });

            } else {
                // Notice({ isError: true, msg: res.message }); 
            }
        } catch (error) {
            // Notice({ isError: true, msg: "Có lỗi xảy ra khi gửi yêu cầu" });
        } finally {
            setLoading(false);
        }
    }
    const DeleteUserAi = async (record) => {
        CB1({
            title: "Bạn có chắc chắn muốn xóa Người dùng?",
            icon: "trashRed",
            okText: "Đồng ý",
            onOk: () => {
                setLoading(true)
                UserService.deleteUserAi(record.id)
                    .then(res => {
                        if (res?.isOk) {
                            GetUsersTable();
                            Notice({
                                msg: "Xóa thành công!",
                            })
                        }
                    })
                    .finally(() => setLoading(false))
            },
        })
    }

    useEffect(() => {
        GetUsersTable()
    }, []);

    const columns1 = columns(DeleteUserAi, GetUsersTable)
    return (
        <UseManagementStyle>
            <Row gutter={[16, 16]} >
                <div className='title-type-1 d-flex justify-content-space-between pb-15 mb-20 ml-0'>
                    Quản lý người dùng
                </div>
                <Row gutter={[16, 16]} className='boxMain'>
                    {/* <Col span={24} style={{ display: "flex", justifyContent: "end" }}>
                        <Space>
                            <Button btnType="primary"
                                onClick={() => {
                                    setIsModalAddUser(true)
                                }}
                                className={loading ? 'disable' : ''} disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Thêm người dùng'}
                            </Button>

                        </Space>
                    </Col> */}
                    <Col span={24}>
                        <div style={{ width: '100%' }} >
                            <TableCustom
                                isPrimary
                                loading={loading}
                                expandable={{
                                    defaultExpandAllRows: true
                                }}
                                columns={columns1}
                                dataSource={ListFile}
                                sticky={{ offsetHeader: -14 }}
                                scroll={{ x: "800px" }}
                                style={{ marginBottom: 4 }}
                                // onRow={(record, rowIndex) => {
                                //     return {
                                //       // onClick: event => {
                                //       //   // setDataEdit(record)
                                //       //   // form.setFieldsValue({ ...record })
                                //       // },
                                //     }
                                //   }}


                                pagination={{
                                    hideOnSinglePage: total <= 10,
                                    page_number: pagination.page_number,
                                    page_size: pagination.page_size,
                                    responsive: true,
                                    total,
                                    locale: { items_per_page: "" },
                                    showSizeChanger: total > 10,
                                    onChange: (page_number, page_size) => {
                                        setPagination({
                                            ...pagination,
                                            page_number: page_number,
                                            page_size,
                                        })
                                    },
                                }}
                                // showPagination
                                // rowKey={record => `${record?.roleId}${record?.LastUpdate}`}
                                footerLeft={<div className="d-flex mt-20" />}
                                widthScroll={1200}
                            // textEmpty="Không có Nhóm quyền nào!"
                            />
                        </div>
                    </Col>
                </Row>



            </Row>
            {isModalAddUser &&
                <ModaAddUser
                    open={isModalAddUser}
                    onOk={() => setIsModalAddUser(false)}
                    onCancel={() => setIsModalAddUser(false)}
                    GetUsersTable={() => GetUsersTable()}

                />
            }
        </UseManagementStyle>
    );
}

export default UserManagement;
