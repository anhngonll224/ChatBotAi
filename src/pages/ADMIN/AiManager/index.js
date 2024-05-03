import React, { useEffect, useState } from 'react';
import { StyleAiManager } from './styled';
import { Col, Form, Row, Tabs } from 'antd';
import TableCustom from 'src/components/Table/CustomTable';
import { columns, columns2, data, data2 } from './Components/tagData';
import ListFile from '../ListFile';
import Notice from 'src/components/Notice';
import AiService from 'src/services/AiService';
import ModalUpdateUser from './Components/ModalUpdateUser';

const AiManager = () => {
    const [isKeyCard, setIsKeyCard] = useState(1);
    const [loading, setLoading] = useState(false)
    const [dataDomain, setDataDomain] = useState()
    const [isModalUpdateUser, setIsModalUpdateUser] = useState()
    const [form] = Form.useForm()

    const onChangeTable = (key) => {
        setIsKeyCard(key)
    };
    const items = [
        {
            key: '1',
            label: <div className='text-tile-tabs'>Danh sách Domain</div>,
            // children: 'Content of Tab Pane 1',
        },
        {
            key: '2',
            label: <div className='text-tile-tabs'>Danh sách File</div>,
            // children: 'Content of Tab Pane 2',
        },
    ];
    const handleSubmitUpdate = async () => {
        setLoading(true)

        try {
            const values = await form?.validateFields()
            // console.log("values", values)
            const requestBody = {
                ...values,

            };
            const res = await AiService.PostApiUpdateDomainForAI(requestBody);
            if (res && res.isOk) {
                setIsModalUpdateUser(false)
                GetDomain()
                // window.open(res.data, "_blank"); 
                // setPDF(res.data)
                Notice({ isError: true, msg: "Cập nhật thành công" });

            } else {
                // Notice({ isError: true, msg: res.message }); 

            }
        } catch (error) {
            // Notice({ isError: true, msg: "Có lỗi xảy ra khi gửi yêu cầu" });
            Notice({ msg: error.response.data.message, isSuccess: false })
        } finally {
            setLoading(false);
        }
    }
    const GetDomain = async () => {
        setLoading(true)
        try {
            // const values = await form?.validateFields()
            // console.log("values", values)
            const requestBody = {
                // ...values,
            };
            const res = await AiService.GetDomain(requestBody);
            // console.log("resDomanin", res)
            if (res && res.isOk && res.data) {
                setDataDomain([{ key: '1', domain: res.data }]);
            } else {
                // throw new Error("Invalid response format or missing data");
            }
        } catch (error) {
            // console.error("Error occurred while fetching domain:", error);
            // Notice({ msg: "Có lỗi xảy ra khi lấy dữ liệu về domain", isSuccess: false });
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        GetDomain()
    }, []);
    const columns1 = columns(setIsModalUpdateUser);
    return (
        <StyleAiManager>
            <Row gutter={[16, 16]} style={{ marginTop: "20px" }} >

                <Col span={24}>
                    <Tabs type="card" defaultActiveKey="1" items={items} onChange={onChangeTable} />
                </Col>
                <Col span={24}>
                    {isKeyCard == 1 && (
                        <div style={{ width: '100%' }} className='boxMain'>
                            <TableCustom
                                loading={loading}
                                expandable={{
                                    defaultExpandAllRows: true
                                }}
                                isPrimary
                                columns={columns1}
                                dataSource={dataDomain}
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


                                // pagination={{
                                //     hideOnSinglePage: total <= 10,
                                //     current: pagination.CurrentPage,
                                //     PageSize: pagination.PageSize,
                                //     responsive: true,
                                //     total,
                                //     locale: { items_per_page: "" },
                                //     showSizeChanger: total > 10,
                                //     onChange: (page, PageSize) => {
                                //         setPagination({
                                //             ...pagination,
                                //             CurrentPage: page,
                                //             PageSize,
                                //         })
                                //         getListRole({ ...pagination, CurrentPage: page, PageSize })
                                //     },
                                // }}
                                showPagination
                                // rowKey={record => `${record?.roleId}${record?.LastUpdate}`}
                                footerLeft={<div className="d-flex mt-20" />}
                                widthScroll={1200}
                            // textEmpty="Không có Nhóm quyền nào!"
                            />
                        </div>
                    )}

                    {isKeyCard == 2 && (
                        <ListFile />
                    )}
                </Col>

            </Row>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    // Username: userInfo.Username,
                }}
            >
                {isModalUpdateUser &&
                    <ModalUpdateUser
                        open={isModalUpdateUser}
                        onOk={() => setIsModalUpdateUser(false)}
                        onCancel={() => setIsModalUpdateUser(false)}
                        handleSubmit={handleSubmitUpdate}
                    />
                }
            </Form>

        </StyleAiManager>
    );
}

export default AiManager;
