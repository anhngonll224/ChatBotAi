import { Input, Space } from 'antd';
import React from 'react';
import { FloatActionWrapper } from 'src/components/FloatAction/styles';
import Button from 'src/components/MyButton/Button';
import ButtonCircle from 'src/components/MyButton/ButtonCircle';

export const data = [
    {
        key: '1',
        // domain:"123yeo.com",
        working: "12",
    },


];

export const columns = (setIsModalUpdateUser) => [
    {
        title: "Domain",
        dataIndex: "domain",
        key: "domain",
        width: 300,
    },
    {
        title: "Hành động",
        dataIndex: "working",
        key: "working",
        width: 100,
        // render: (text, record) => (
        //     <div style={{ textAlign: "center", justifyContent: "center", display: "flex" }}>
        //         <Button
        //             type="primary"
        //             onClick={() => handleSubmit()} 
        //         >
        //             Cập nhật 
        //         </Button>
        //         <Button
        //             type="primary"
        //             onClick={() => handleSubmit()} 
        //         >
        //             Cập nhật 
        //         </Button>
        //     </div>
        // ),
        render: (val, record) => (
            <div>
                <div>
                    {/* {record?.criteria_level == 1 ? `${val}/100 điểm` : `tối đa ${val} điểm`} */}
                </div>

                <FloatActionWrapper size="small" className="float-action__wrapper">
                    <Space>
                        <ButtonCircle
                            title="Xóa"
                            iconName="delete-outline"
                        // onClick={() => {
                        //     handleSubmit(record)
                        // }}
                        />
                        <ButtonCircle
                            title="Cập nhật"
                            iconName="refresh-icon"
                            onClick={() => {
                                setIsModalUpdateUser(true)
                            }}
                        />
                    </Space>
                </FloatActionWrapper>
            </div>
        ),
    },
];


export const data2 = [
    {
        key: '1',
        // domain:"123yeo.com",
        working: "12",
    },


];

export const columns2 = [
    {
        title: "STT",
        dataIndex: "domain",
        key: "domain",
        width: 50,
        // render: (text, record) => (
        //     <Input
        //         value={text}
        //         onChange={(e) => {

        //         }}
        //     />
        // ),
    },
    {
        title: "Kill",
        dataIndex: "kill",
        key: "kill",
        width: 300,
        // render: (text, record) => (
        //     <Input
        //         value={text}
        //         onChange={(e) => {

        //         }}
        //     />
        // ),
    },
    {
        title: "Working",
        dataIndex: "working",
        key: "working",
        width: 100,
        render: (text, record) => (
            <div style={{ textAlign: "center", justifyContent: "center", display: "flex" }}>
                <Button
                    type="primary"
                    onClick={() => {

                    }}
                >
                    Working
                </Button>
            </div>
        ),
    },
];



