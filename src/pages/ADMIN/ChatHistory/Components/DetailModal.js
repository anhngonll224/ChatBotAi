import { Modal } from 'antd';
import React from 'react';

const DetailModal = ({ open, onOk, onCancel }) => {
    return (
        <Modal title="Câu trả lời" open={open} onOk={onOk} onCancel={onCancel}
            width={1000}
            footer={null}
        >
            <div>{open?.answer || 'Không có dữ liệu'}</div>
        </Modal>
    );
}

export default DetailModal;
