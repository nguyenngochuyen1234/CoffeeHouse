import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { newsRow } from '@/models';
export interface ModalReviewNewsProps {
    isModalReviewOpen: boolean
    setIsModalReviewOpen: (newValue: boolean) => void
    contentRow: newsRow | null
}
const ModalReviewNews: React.FC<ModalReviewNewsProps> = ({ isModalReviewOpen, setIsModalReviewOpen, contentRow }) => {
    const [content, setContent] = useState<string| TrustedHTML>('')
    useEffect(()=>{
        if(contentRow?.News_Content){
            setContent(contentRow.News_Content)
        }
    },[contentRow])
    const showModal = () => {
        setIsModalReviewOpen(true);
    };

    const handleOk = () => {
        setIsModalReviewOpen(false);
    };

    const handleCancel = () => {
        setIsModalReviewOpen(false);
    };

    return (
        <>
            <Modal
                title=""
                open={isModalReviewOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
                width={1000}
            >
            <div dangerouslySetInnerHTML={{ __html: content }} className="overflow-auto"></div>

            </Modal>
        </>
    );
};

export default ModalReviewNews;