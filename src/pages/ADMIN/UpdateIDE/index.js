import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Col, Form, Input, Row, Spin, message } from 'antd';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/display/autorefresh';
import copy from 'clipboard-copy';
import Button from 'src/components/MyButton/Button';
import { StyleUpdateIDE } from './styled';
import { CopyOutlined } from '@ant-design/icons';
import AiService from 'src/services/AiService';

const UpdateIDE = () => {
    const [code, setCode] = useState('import React, { useState } from  ');
    const [isClicked, setIsClicked] = useState(false);
    const [loading, setLoading] = useState();
    const [linkCode, setLinkCode] = useState({});

    const dataLink = async () => {
        try {
            setLoading(true);
            const resp = await AiService.GetScriptLink();
            if (resp?.isOk) {
                const linkTagCss = `<link href="${resp?.data?.css}" rel="stylesheet"></link>`
                const linkTagJs = `<script defer="defer" src="${resp?.data?.js}"></script>`
                setLinkCode({
                    scriptTag: linkTagJs,
                    linkTag: linkTagCss,
                })
                setCode(`
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Chat-Bot</title>
    // Link copy
    ${linkCode.scriptTag}
    ${linkCode.linkTag}
    // end link copy
</head>

<body>
// thêm thẻ này vào trong body
<div id="root"></div>
</body>

</html>
                
                `)
            }
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        dataLink()
    }, [code]);
    const handleChange = (editor, data, value) => {
        setCode(value);
    };

    const handleCopy = () => {
        copy(code);
        setIsClicked(true); // Đánh dấu biểu tượng đã được click
        setTimeout(() => setIsClicked(false), 200); // Đặt lại trạng thái sau 200ms
        message.success('Đã sao chép mã thành công');
    };
    return (
        <StyleUpdateIDE>
            <Spin spinning={loading}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <div className="title-type-1 d-flex justify-content-space-between pb-15 mb-20 ">
                            Cập nhật (IDE)
                        </div>
                    </Col>


                    <div className='boxMain' style={{ width: "100%" }}>
                        <Row gutter={[16, 16]}>
                            {/* <Col span={24}>
                            <Form.Item
                                label="Cập nhật link"
                                name="link"
                            >
                                <Input placeholder='Nhập'></Input>
                            </Form.Item>
                        </Col> */}
                            <Col span={24}>
                                <span style={{ fontWeight: '600' }}>Link Copy vào trang web của bạn</span><br></br>
                                <span className='text-italic'> (Thêm đoạn link dưới đây các trang web bạn muốn cho phép nhúng Chat Ai của mình)</span>
                            </Col>
                            <Col span={24}>
                                <div style={{ marginBottom: '10px' }}>
                                    <CodeMirror
                                        value={code}
                                        options={{
                                            mode: 'javascript',
                                            theme: 'material',
                                            lineNumbers: true
                                        }}
                                        onBeforeChange={handleChange}
                                    />
                                </div>
                                <div style={{ position: 'absolute', top: '5px', right: '10px', zIndex: '999' }}>
                                    <CopyOutlined
                                        className={isClicked ? 'copy-icon-clicked' : ''} // Áp dụng class khi biểu tượng được click
                                        style={{ fontSize: '20px', color: '#08c', cursor: 'pointer' }}
                                        onClick={handleCopy}
                                        title="Copy"
                                    />
                                </div>
                            </Col>

                            {/* <Col span={24} style={{ display: "flex", justifyContent: "end" }}>
                            <Button btnType="primary" onClick={handleSubmit}>Gửi lên Server</Button>
                        </Col> */}
                        </Row>

                    </div>
                </Row>
            </Spin>
        </StyleUpdateIDE>
    );
}

export default UpdateIDE;
