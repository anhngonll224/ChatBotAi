import { Input } from 'antd';
import React from 'react';
import Button from 'src/components/MyButton/Button';

export const data = [
    {
        key: '1',
        // domain:"123yeo.com",
        working:"12",
    },
    

];

export const columns = [
    {
        title: "Domain",
        dataIndex: "domain",
        key: "domain",
        width: 300,
        render: (text, record) => (
            <Input
                value={text}
                onChange={(e) => {
                   
                }}
            />
        ),
    },
    {
        title: "Working",
        dataIndex: "working",
        key: "working",
        width: 100,
        render: (text, record) => (
            <div style={{ textAlign: "center",justifyContent:"center",display:"flex" }}>
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



