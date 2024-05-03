import { Col, Form, Row, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Button from 'src/components/MyButton/Button';
import TableCustom from 'src/components/Table/CustomTable';
import FileService from 'src/services/FileService';
import ModalUploadFile from './Components/ModalUploadFile';
import { FloatActionWrapper } from 'src/components/FloatAction/styles';
import ButtonCircle from 'src/components/MyButton/ButtonCircle';
import Notice from 'src/components/Notice';
import { ListFileStyle } from './styled';
import CB1 from 'src/components/Modal/CB1';
import AiService from 'src/services/AiService';

const ListFile = ({ className }) => {
    const [buttonHide, setButtonHide] = useState(true)
    const [loading, setLoading] = useState()
    const [ListFile, setListFile] = useState()
    const [form] = Form.useForm()
    const [isModalUploadFileOpen, setIsModalUploadFileOpen] = useState(false);
    const getDataPdf = async () => {
        try {
            setLoading(true)
            const resp = await FileService.getFilesByUserID()
            setListFile(resp?.data)
            const hasStatus2 = resp?.data.some(item => item.status === 0 || item.status === 3);
            if (hasStatus2) {
                console.log('Có ít nhất một đối tượng có status = 0');
                setButtonHide(false)
            } else {
                setButtonHide(true)
                console.log('Không có đối tượng nào có status = 0');
            }
        }
        finally {
            setLoading(false)
        }
    }
    const handleDeleteFileByFileID = async (record) => {
        CB1({
            title: "Bạn có chắc chắn muốn xóa File?",
            icon: "trashRed",
            okText: "Đồng ý",
            onOk: () => {
                setLoading(true)
                FileService.deleteFileByFileID({
                    file_id: record.id,
                })
                    .then(res => {
                        if (res?.isOk) {
                            getDataPdf()
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
        getDataPdf()
    }, []);
    const handleRowClick = (record) => {
        window.open(record.url, "_blank");
    };
    const handleChangeUpTo = async () => {
        try {
            setLoading(true)
            const resp = await AiService.requestTraining()
            getDataPdf()
        }
        finally {
            setLoading(false)
        }
    }
    const columns = [
        // {
        //     title: "STT",
        //     dataIndex: "id",
        //     key: "id",
        //     width: 60,
        //     render: (val, record, idx) => (
        //         <div className="text-center">
        //             {idx + 1 + pagination.PageSize * (pagination.CurrentPage - 1)}
        //         </div>
        //     ),
        //     align: "center",
        // },
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            width: 60,
            render: (text, record, index) => index + 1,
            align: "center",
        },
        {
            title: "Tên File",
            dataIndex: "title",
            key: "title",
            className: "hoverable-column", // Assign class for hover effect
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
            width: 150,
            align: "center",
            render: (val, record) => (
                <div>
                    {val} Byte
                </div>
            )
        },
        // {
        //     title: "Loại",
        //     dataIndex: "file_type",
        //     key: "file_type",
        //     width: 150,
        //     render: (val, record) => (
        //         <div>
        //             <div>
        //                 {val}
        //             </div>
        //         </div>
        //     )
        // },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 200,
            align: "center",
            render: (val, record) => (
                <div>
                    <div>
                        {val === 0 ? <b style={{ color: 'blue' }}>New</b> : val === 1 ? <b style={{ color: '#ff8a00' }}>Training</b> : val === 2 ? <b style={{ color: 'green' }}>Trained</b> : <b style={{ color: 'red' }}>Fail</b>}
                    </div>

                    <FloatActionWrapper size="small" className="float-action__wrapper">
                        <Space>
                            {/* <ButtonCircle
                                title="Chỉnh sửa"
                                iconName="editTypeConfig"
                                onClick={() => handleSubmit({
                                    isEdit: true,
                                    record
                                })}
                            /> */}
                            <ButtonCircle
                                title="Xóa"
                                iconName="delete-outline"
                                onClick={() => {
                                    handleDeleteFileByFileID(record)
                                }}
                            />
                            <ButtonCircle
                                title="Tải tài liệu"
                                iconName="download"
                                onClick={() => {
                                    handleRowClick(record)
                                }}
                            />
                        </Space>
                    </FloatActionWrapper>
                </div>
            ),
        },

    ]

    return (
        <ListFileStyle>
            <Row gutter={[16, 16]}>
                <div className='boxMain'>
                    <Row gutter={[16, 16]}>
                        <Col span={24} style={{ display: "flex", justifyContent: "end" }}>
                            <Space>
                                <Button btnType="primary" disabled={buttonHide}
                                    onClick={() => handleChangeUpTo()}
                                >
                                    Upload files to the server
                                </Button>
                                <Button btnType="primary"
                                    onClick={() => {
                                        setIsModalUploadFileOpen(true)
                                    }}
                                    className={loading ? 'disable' : ''} disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Thêm File'}

                                </Button>

                            </Space>
                        </Col>
                        <Col span={24}>
                            {/* <Table
                     columns={columns}
                        dataSource={ListFile}
                        bordered
                        loading={loading}
                       
                    /> */}
                            <TableCustom
                                loading={loading}
                                expandable={{
                                    defaultExpandAllRows: true
                                }}
                                isPrimary
                                columns={columns}
                                dataSource={ListFile}
                                sticky={{ offsetHeader: -14 }}
                                scroll={{ x: "800px" }}
                                style={{ marginBottom: 4 }}
                                // onRow={(record) => ({
                                //     onClick: () => handleRowClick(record)
                                // })}
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
                        </Col>
                    </Row>

                </div>

            </Row>

            {isModalUploadFileOpen &&
                <ModalUploadFile
                    open={isModalUploadFileOpen}
                    onOk={() => setIsModalUploadFileOpen(false)}
                    onCancel={() => setIsModalUploadFileOpen(false)}
                    getDataPdf={() => getDataPdf()}
                />
            }



        </ListFileStyle>
    );
}

export default ListFile;
